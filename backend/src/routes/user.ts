import express, { type Request, type Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../db/db";
import { USER_JWT_SECRET } from "../config";

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

    res.cookie("token", token);

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

// purchase course
userRouter.post("/purchase", async (req: Request, res: Response) => {});

// get all available courses
userRouter.get("/bulk", async (req: Request, res: Response) => {});

// get all purchased courses
userRouter.get("/purchased", async (req: Request, res: Response) => {});

// update user info
userRouter.put("/update", async (req: Request, res: Response) => {});
