import z from 'zod';

export const signupBody = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string().optional(),
  password: z.string().min(6),
});

export const signinBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const purchaseBody = z.object({
  courseId: z.string(),
});

export const updateBody = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
});

export const CreateCourseBody = z.object({
  title: z.string().max(30),
  description: z.string().max(200),
  price: z.number().optional(),
  imageUrl: z.string(),
});

export const UpdateCourseBody = z.object({
  title: z.string().max(30).optional(),
  description: z.string().max(200).optional(),
  price: z.number().optional(),
  imageUrl: z.string().optional(),
});
