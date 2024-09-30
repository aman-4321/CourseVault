import express, { type Request, type Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Course, Purchase, User } from "../db/db";
import { USER_JWT_SECRET } from "../config";
import { userMiddleware } from "../middleware/middleware";
import mongoose from "mongoose";
import { password } from "bun";
export const userRouter = express.Router();

const signupBody = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string().optional(),
  password: z.string().min(6),
});

//signup
userRouter.post("/signup", async (req: Request, res: Response) => {
  const { success, error, data } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid Input",
      error: error.errors,
    });
  }

  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already Exists",
    });
  }

  const { password, email, firstName, lastName } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName: lastName || "",
    });

    const userId = user._id;

    const token = jwt.sign({ userId }, USER_JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User created successfully",
      userId,
      email,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error creating User",
      error: err.message || err,
    });
  }
});

const signinBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// signin
userRouter.post("/signin", async (req: Request, res: Response) => {
  const { success, error, data } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
      error: error.errors,
    });
  }

  const { email, password } = data;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, USER_JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged in successfully",
      userId: user._id,
      email: user.email,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error during signin",
      error: err.message || err,
    });
  }
});

const purchaseBody = z.object({
  courseId: z.string(),
});

// purchase course
userRouter.post(
  "/purchase",
  userMiddleware,
  async (req: Request, res: Response) => {
    const { success, error, data } = purchaseBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        messgae: "Invalid Input",
        error: error.errors,
      });
    }

    let courseId;
    try {
      courseId = new mongoose.Types.ObjectId(data.courseId);
    } catch (e) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }
    const userId = req.userId;

    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          message: "Course not found",
        });
      }

      const user = await User.findById(userId);
      if (user?.coursesOwned.includes(courseId)) {
        return res.status(409).json({
          message: "You already own the course",
        });
      }

      const purchase = await Purchase.create({
        courseId: course._id,
        userId: userId,
      });

      user?.coursesOwned.push(course._id);
      await user?.save();

      return res.status(200).json({
        message: "Course purchased successfully",
        purchaseId: purchase._id,
        courseId: course._id,
        userId: userId,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: "Error processing purchase",
        error: err.message || err,
      });
    }
  },
);

// get all available courses
userRouter.get("/bulk", async (req: Request, res: Response) => {
  try {
    const allCourses = await Course.find({});

    return res.json({
      allCourses,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: "Error retrieving Courses",
      error: err.message || err,
    });
  }
});

// get all purchased courses
userRouter.get(
  "/purchased",
  userMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
      const user = await User.findById(userId).populate("purchases");

      if (!user || user.purchases.length === 0) {
        return res.status(404).json({
          messages: "You don't have any courses yet",
        });
      }

      return res.status(200).json({
        purchases: user.purchases,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: "Error retrieving Courses",
        error: err.message || err,
      });
    }
  },
);

// update user info

const updateBody = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
});

userRouter.put(
  "/update",
  userMiddleware,
  async (req: Request, res: Response) => {
    const { success, error, data } = updateBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: error.errors,
      });
    }

    const userId = req.userId;
    const { password, email, firstName, lastName } = data;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({
            message: "Email already exists",
          });
        }
      }

      if (email) user.email = email;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      await user.save();

      const token = jwt.sign({ userId }, USER_JWT_SECRET, { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      });

      res.status(200).json({
        message: "User updated successfully",
        userId,
        email: user.email,
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Error updating user",
        error: err.message || err,
      });
    }
  },
);

userRouter.post(
  "/logout",
  userMiddleware,
  async (req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  },
);
