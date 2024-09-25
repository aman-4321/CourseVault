import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { courseRouter } from "./routes/course";
import { adminRouter } from "./routes/admin";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/course", adminRouter);

app.listen(port);
