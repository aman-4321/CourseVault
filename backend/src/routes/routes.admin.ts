import express from 'express';
import {
  AdminEarnings,
  AdminSignin,
  AdminSingup,
  CreateCourse,
  DeleteCourse,
  UpdateCourse,
} from '../controller/admin.controller';
import { adminMiddleware } from '../middleware/middleware';

export const AdminRouter = express.Router();

AdminRouter.post('/signup', AdminSignin);

AdminRouter.post('/signin', AdminSingup);

AdminRouter.post('/course', adminMiddleware, CreateCourse);

AdminRouter.put('/course/:courseId', adminMiddleware, UpdateCourse);

AdminRouter.delete('/course/:courseId', adminMiddleware, DeleteCourse);

AdminRouter.get('/earnings', adminMiddleware, AdminEarnings);
