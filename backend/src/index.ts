import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user";
import { courseRouter } from "./routes/course";
import { adminRouter } from "./routes/admin";

const app: Express = express();

const port = process.env.PORT || 8081;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(port);
