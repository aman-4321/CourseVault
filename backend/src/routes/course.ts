import express, { type Request, type Response } from 'express';
import { Course } from '../db/db';

export const courseRouter = express.Router();

// see all courses
courseRouter.get('/course', async (req: Request, res: Response) => {
  try {
    const allCourses = await Course.find({});

    return res.json({
      allCourses,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: 'Error retrieving Courses',
      error: err.message || err,
    });
  }
});

// see a specific course
courseRouter.get('/course/:courseId', async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }

    return res.json({
      course,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: 'Error retrieving the course',
      error: err.message || err,
    });
  }
});
