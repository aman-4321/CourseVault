import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { ADMIN_JWT_SECRET, USER_JWT_SECRET } from '../config';
import { User } from '../models/user.model';
import { Admin } from '../models/admin.model';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: any;
      admin?: any;
    }
  }
}

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, USER_JWT_SECRET) as JwtPayload;

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    req.userId = decoded._id;
    req.user = user;
    return next();
  } catch (err) {
    console.error('Token verification error:', err);
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: 'Token expired',
      });
      return;
    }

    res.status(401).json({
      message: 'Invalid Token',
    });
    return;
  }
};

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET) as JwtPayload;

    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      res.status(401).json({ message: 'Admin not found' });
      return;
    }

    req.userId = decoded._id;
    req.admin = admin;
    return next();
  } catch (err) {
    console.error('Token verification error:', err);
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }
    res.status(401).json({ message: 'Invalid Token' });
    return;
  }
};
