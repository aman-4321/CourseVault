import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express } from 'express';
import { ConnectToDb } from './db/db';
import { AdminRouter } from './routes/admin.routes';
import { CourseRouter } from './routes/course.routes';
import { UserRouter } from './routes/user.routes';

const app: Express = express();

dotenv.config();

const port = process.env.PORT;

ConnectToDb();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/course', CourseRouter);
app.use('/api/v1/admin', AdminRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
