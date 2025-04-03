import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

export interface AuthenticatedRequest extends Request {
  staff?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
     res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
    }
    const decoded: any = verifyToken(token as string);

    req.staff = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};