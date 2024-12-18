import express, { type Request, type Response } from 'express';
import { Course } from '../models/course.model';

// see all courses
export const AllCourses = async (req: Request, res: Response) => {
  try {
    const allCourses = await Course.find({});
    res.json({
      allCourses,
    });
    return;
  } catch (err: any) {
    res.status(500).json({
      message: 'Error retrieving Courses',
      error: err.message || err,
    });
    return;
  }
};

// see a specific course
export const SpecificCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        message: 'Course not found',
      });
      return;
    }

    res.json({
      course,
    });
    return;
  } catch (err: any) {
    res.status(500).json({
      message: 'Error retrieving the course',
      error: err.message || err,
    });
    return;
  }
};
