import { type Request, type Response } from 'express';
import { Course } from '../models/course.model';

// get all courses
export const AllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({});
    res.json({
      courses,
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

// get a specific course
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
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving the course',
      error: err,
    });
    return;
  }
};
