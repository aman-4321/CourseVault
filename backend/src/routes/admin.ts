import express, { type Request, type Response } from "express";

export const adminRouter = express.Router();

// signup
adminRouter.post("/signup", async (req: Request, res: Response) => {});

// signin
adminRouter.post("/signin", async (req: Request, res: Response) => {});

// create a course
adminRouter.post("/course", async (req: Request, res: Response) => {});

// update a course
adminRouter.put("/course", async (req: Request, res: Response) => {});

// delete a course
adminRouter.delete("/course", async (req: Request, res: Response) => {});

// get all courses
adminRouter.get("/course/bulk", async (req: Request, res: Response) => {});

// how much did admin earn
adminRouter.get("/earnings", async (req: Request, res: Response) => {});
