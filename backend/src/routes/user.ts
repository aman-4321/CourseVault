import express, { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Course, Purchase, User } from '../db/db';
import { USER_JWT_SECRET } from '../config';
import { userMiddleware } from '../middleware/middleware';
import mongoose from 'mongoose';
import {
  purchaseBody,
  signinBody,
  signupBody,
  updateBody,
} from '../types/validation';
export const userRouter = express.Router();

//signup
userRouter.post('/signup', async (req: Request, res: Response) => {
  const { success, error, data } = signupBody.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: 'Invalid Input',
      error: error.errors,
    });
    return;
  }

  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    res.status(409).json({
      message: 'Email already Exists',
    });
    return;
  }

  const { password, email, firstName, lastName } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName: lastName || '',
    });

    const userId = user._id;

    const token = jwt.sign({ userId }, USER_JWT_SECRET, { expiresIn: '24h' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'User created successfully',
      userId,
      email,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Error creating User',
      error: err.message || err,
    });
  }
});

// signin
userRouter.post('/signin', async (req: Request, res: Response) => {
  const { success, error, data } = signinBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      message: 'Invalid input',
      error: error.errors,
    });
    return;
  }

  const { email, password } = data;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: 'Invalid email or password',
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: 'Invalid email or password',
      });
      return;
    }

    const token = jwt.sign({ userId: user._id }, USER_JWT_SECRET, {
      expiresIn: '24h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Logged in successfully',
      userId: user._id,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error during signin',
      error: err,
    });
  }
});

// purchase course
userRouter.post(
  '/purchase',
  userMiddleware,
  async (req: Request, res: Response) => {
    const { success, error, data } = purchaseBody.safeParse(req.body);
    if (!success) {
      res.status(400).json({
        messgae: 'Invalid Input',
        error: error.errors,
      });
      return;
    }

    let courseId;
    try {
      courseId = new mongoose.Types.ObjectId(data.courseId);
    } catch (e) {
      res.status(400).json({ message: 'Invalid course ID format' });
      return;
    }
    const userId = req.userId;

    try {
      const existingPurchase = await Purchase.findOne({
        userId: userId,
        courseId: courseId,
      });

      if (existingPurchase) {
        res.status(400).json({
          message: 'Course already purchased',
        });
        return;
      }

      const purchase = await Purchase.create({
        courseId,
        userId,
      });

      await User.findByIdAndUpdate(userId, {
        $push: {
          coursesOwned: courseId,
          purchases: purchase._id,
        },
      });

      res.status(200).json({
        message: 'Course purchased successfully',
        purchaseId: purchase._id,
        userId: userId,
      });
      return;
    } catch (err) {
      res.status(500).json({
        message: 'Error processing purchase',
        error: err,
      });
      return;
    }
  }
);

// get all purchased courses
userRouter.get(
  '/purchased',
  userMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
      const user = await User.findById(userId).populate('purchases');

      if (!user || user.purchases.length === 0) {
        res.status(404).json({
          messages: "You don't have any courses yet",
        });
        return;
      }

      res.status(200).json({
        purchases: user.purchases,
      });
      return;
    } catch (err: any) {
      res.status(500).json({
        message: 'Error retrieving Courses',
        error: err.message || err,
      });
      return;
    }
  }
);

// update user info
userRouter.put(
  '/update',
  userMiddleware,
  async (req: Request, res: Response) => {
    const { success, error, data } = updateBody.safeParse(req.body);

    if (!success) {
      res.status(400).json({
        message: 'Invalid Input',
        error: error.errors,
      });
      return;
    }

    const userId = req.userId;
    const { password, email, firstName, lastName } = data;

    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({
          message: 'User not found',
        });
        return;
      }

      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          res.status(409).json({
            message: 'Email already exists',
          });
          return;
        }
      }

      if (email) user.email = email;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      await user.save();

      const token = jwt.sign({ userId }, USER_JWT_SECRET, { expiresIn: '1h' });

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
      });

      res.status(200).json({
        message: 'User updated successfully',
        userId,
        email: user.email,
      });
    } catch (err: any) {
      res.status(500).json({
        message: 'Error updating user',
        error: err.message || err,
      });
    }
  }
);

//logout
userRouter.post(
  '/logout',
  userMiddleware,
  async (req: Request, res: Response) => {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Logged out successfully',
    });
    return;
  }
);
