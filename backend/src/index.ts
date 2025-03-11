import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, type Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { ConnectToDb } from './db/db';
import { AdminRouter } from './routes/admin.routes';
import { CourseRouter } from './routes/course.routes';
import { UserRouter } from './routes/user.routes';

const app: Express = express();

dotenv.config();

const port = process.env.PORT;

ConnectToDb();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: 'Too many requests from this IP, please try again later',
});

if (process.env.NODE_ENV === 'production') {
  app.use(limiter);
}

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(helmet());
app.use(compression());

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/course', CourseRouter);
app.use('/api/v1/admin', AdminRouter);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
