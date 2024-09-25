import express, { type Request, type Response } from "express";
import z from "zod";

export const userRouter = express.Router();

const signupBody = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string().optional(),
  password: z.string().min(6),
});

//signup
userRouter.post("/signup", async (req: Request, res: Response) => {
  const { success, error } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid Input",
      error: error.errors,
    });
  }
});

// signin
userRouter.post("/signin", async (req: Request, res: Response) => {});

// purchase course
userRouter.post("/purchase", async (req: Request, res: Response) => {});

// get all available courses
userRouter.get("/bulk", async (req: Request, res: Response) => {});

// get all purchased courses
userRouter.get("/purchased", async (req: Request, res: Response) => {});

// update user info
userRouter.put("/update", async (req: Request, res: Response) => {});
