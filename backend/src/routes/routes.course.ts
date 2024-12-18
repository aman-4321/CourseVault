import express from 'express';
import { AllCourses, SpecificCourse } from '../controller/course.controller';

export const CourseRouter = express.Router();

CourseRouter.get('/course', AllCourses);

CourseRouter.get('/course/:courseId', SpecificCourse);
