import express, { type Request, type Response } from "express";

export const courseRouter = express.Router();

// see all courses
courseRouter.get("/course", async (req: Request, res: Response) => {});

// see a specific course
courseRouter.get(
  "/course/:courseId",
  async (req: Request, res: Response) => {},
);
