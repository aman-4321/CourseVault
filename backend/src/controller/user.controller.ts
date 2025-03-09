import { Request, Response } from 'express';
import {
  purchaseBody,
  signinBody,
  signupBody,
  updateBody,
} from '../types/validation';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { USER_JWT_SECRET } from '../config';
import mongoose from 'mongoose';
import { Course } from '../models/course.model';
import { Purchase } from '../models/purchase.model';

//signup
export const SignupUser = async (req: Request, res: Response) => {
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

    res.cookie('userToken', token, {
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
};

// signin
export const UserSignin = async (req: Request, res: Response) => {
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

    res.cookie('userToken', token, {
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
};

// purchase course
export const PurchaseCourse = async (req: Request, res: Response) => {
  const { success, error, data } = purchaseBody.safeParse(req.params);
  if (!success) {
    res.status(400).json({
      messgae: 'Invalid Input',
      error: error.errors,
    });
    return;
  }

  const userId = req.userId;

  try {
    const courseId = new mongoose.Types.ObjectId(data.courseId);

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        message: 'Course not found',
      });
      return;
    }

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
};

// already purchased courses
export const AlreadyPurchased = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        message: 'Course not found',
      });
      return;
    }

    const existingPurchase = await Purchase.findOne({
      userId: userId,
      courseId: courseId,
    });

    if (existingPurchase) {
      res.status(200).json({
        purchased: true,
        message: 'Course already purchased',
      });
      return;
    } else {
      res.status(200).json({
        purchased: false,
        message: 'Course not purchased',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error checking the purchased course',
      error: err,
    });
  }
};

// get all purchased courses
export const GetAllPurchasedCourse = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate({
      path: 'purchases',
      populate: {
        path: 'courseId',
        model: 'Course',
      },
    });

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
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving Courses',
      error: err,
    });
    return;
  }
};

// update user info
export const UpdateUserInfo = async (req: Request, res: Response) => {
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
};

//logout
export const UserLogout = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
  });

  res.status(200).json({
    message: 'Logged out successfully',
  });
  return;
};

export const GetUserProfile = async (req: Request, res: Response) => {
  res.status(200).json({
    user: req.user,
  });
};
