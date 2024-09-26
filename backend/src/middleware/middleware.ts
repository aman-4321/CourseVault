import { type Request, type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ADMIN_JWT_SECRET, USER_JWT_SECRET } from "../config";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, secret: string): boolean => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      message: "No token provided",
    });
    return false;
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    res.status(401).json({
      message: "Invalid authorization header format",
    });
    return false;
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.userId = decoded.userId;
    return true;
  } catch (err: any) {
    const message =
      err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    res.status(403).json({ message });
    return false;
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const secret = ADMIN_JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: "Server configuration error" });
    return;
  }
  if (verifyToken(req, res, secret)) {
    next();
  }
};

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const secret = USER_JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: "Server configuration error" });
    return;
  }
  if (verifyToken(req, res, secret)) {
    next();
  }
};
