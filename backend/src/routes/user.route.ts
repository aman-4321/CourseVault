import express from 'express';
import {
  AlreadyPurchased,
  GetAllPurchasedCourse,
  GetUserProfile,
  PurchaseCourse,
  SignupUser,
  UpdateUserInfo,
  UserLogout,
  UserSignin,
} from '../controller/user.controller';
import { userMiddleware } from '../middleware/middleware';

export const UserRouter = express.Router();

UserRouter.post('/signup', SignupUser);

UserRouter.post('/signin', UserSignin);

UserRouter.post('/purchase/:courseId', userMiddleware, PurchaseCourse);

UserRouter.get('/purchased', userMiddleware, GetAllPurchasedCourse);

UserRouter.put('/update', userMiddleware, UpdateUserInfo);

UserRouter.post('/logout', userMiddleware, UserLogout);

UserRouter.get('/profile', userMiddleware, GetUserProfile);

UserRouter.get('/check/:courseId', userMiddleware, AlreadyPurchased);
