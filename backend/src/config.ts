import dotenv from 'dotenv';

dotenv.config();

if (!process.env.ADMIN_JWT_SECRET || !process.env.USER_JWT_SECRET) {
  throw new Error('Missing JWT secret in environment variables');
}

export const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || '';
export const USER_JWT_SECRET = process.env.USER_JWT_SECRET || '';
