import express, { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  CreateCourseBody,
  signinBody,
  signupBody,
  UpdateCourseBody,
} from '../types/validation';
import { Admin, Course, Purchase } from '../db/db';
import { ADMIN_JWT_SECRET } from '../config';
import { adminMiddleware } from '../middleware/middleware';

export const adminRouter = express.Router();

// signup
adminRouter.post('/signup', async (req: Request, res: Response) => {
  const { success, error, data } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: 'Invalid Inputs',
      error: error.errors,
    });
  }

  const existingAdmin = await Admin.findOne({
    email: data.email,
  });

  if (existingAdmin) {
    return res.status(409).json({
      message: 'Email already Exists',
    });
  }

  const { email, password, firstName, lastName } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await Admin.create({
      email,
      password: hashedPassword,
      firstName,
      lastName: lastName || '',
    });

    const adminId = admin._id;

    const token = jwt.sign({ adminId }, ADMIN_JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Admin created successfully',
      adminId,
      email,
    });
  } catch (err: any) {
    return res.json(500).json({
      message: 'Error creating Admin',
      error: err.message || err,
    });
  }
});

// signin
adminRouter.post('/signin', async (req: Request, res: Response) => {
  const { success, error, data } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: 'Invalid input',
      error: error.errors,
    });
  }

  const { email, password } = data;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign({ adminId: admin._id }, ADMIN_JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Logged in successfully',
      adminId: admin._id,
      email: admin.email,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: 'Error during Signin',
      error: err.message || err,
    });
  }
});

// create a course
adminRouter.post(
  '/course',
  adminMiddleware,
  async (req: Request, res: Response) => {
    const { success, error, data } = CreateCourseBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        messgae: 'Invalid Input',
        error: error.errors,
      });
    }

    const { title, price, imageUrl, description } = data;

    try {
      const course = await Course.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
      });

      return res.status(200).json({
        message: 'Course created successfully',
        course,
      });
    } catch (err: any) {
      res.status(500).json({
        message: 'Error creating Course',
        error: err.message || err,
      });
    }
  },
);

// update a course
adminRouter.put(
  '/course/:courseId',
  adminMiddleware,
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { success, error, data } = UpdateCourseBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: 'Invalid Input',
        error: error.errors,
      });
    }

    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { ...data },
        { new: true },
      );

      if (!updatedCourse) {
        return res.status(404).json({
          message: 'Course not found',
        });
      }

      return res.status(200).json({
        message: 'Course updated successfully',
        updatedCourse,
      });
    } catch (err: any) {
      res.status(500).json({
        message: 'Error updating course',
        error: err.message || err,
      });
    }
  },
);

// delete a course
adminRouter.delete(
  '/course/:courseId',
  adminMiddleware,
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const adminId = req.userId;

    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          message: 'Course not found',
        });
      }

      if (course.creatorId.toString() !== adminId) {
        return res.status(403).json({
          message: 'You are not authorized to delete this course',
        });
      }

      await course.deleteOne();

      return res.status(200).json({
        message: 'course was successfully deleted',
      });
    } catch (err: any) {
      res.status(500).json({
        message: 'Error deleting course',
        error: err.message || err,
      });
    }
  },
);

// admin earnings
adminRouter.get(
  '/earnings',
  adminMiddleware,
  async (req: Request, res: Response) => {
    const adminId = req.userId;

    try {
      const courses = await Course.find({ creatorId: adminId });

      if (courses.length === 0) {
        return res.status(404).json({
          message: 'No courses found for this admin',
        });
      }

      const courseIds = courses.map((course) => course._id);
      const purchases = await Purchase.find({ courseId: { $in: courseIds } });

      const totalEarnings = purchases.reduce((sum, purchase) => {
        const course = courses.find((course) =>
          course._id.equals(purchase.courseId),
        );
        return sum + (course ? course.price : 0);
      }, 0);

      return res.status(200).json({
        message: 'Earnings calculated successfully',
        totalEarnings,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: 'Error calculating earnings',
        error: err.message || err,
      });
    }
  },
);
