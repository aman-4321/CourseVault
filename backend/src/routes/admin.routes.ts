import express from 'express';
import {
  AdminEarnings,
  AdminLogout,
  AdminSignin,
  AdminSignup,
  CreateCourse,
  DeleteCourse,
  getAdminAllCourses,
  GetAdminProfile,
  UpdateCourse,
} from '../controller/admin.controller';
import { adminMiddleware } from '../middleware/middleware';

export const AdminRouter = express.Router();

AdminRouter.post('/signup', AdminSignup);

AdminRouter.post('/signin', AdminSignin);

AdminRouter.post('/course', adminMiddleware, CreateCourse);

AdminRouter.put('/course/:courseId', adminMiddleware, UpdateCourse);

AdminRouter.delete('/course/:courseId', adminMiddleware, DeleteCourse);

AdminRouter.get('/earnings', adminMiddleware, AdminEarnings);

AdminRouter.get('/profile', adminMiddleware, GetAdminProfile);

AdminRouter.get('/courses', adminMiddleware, getAdminAllCourses);

AdminRouter.post('/logout', adminMiddleware, AdminLogout);
