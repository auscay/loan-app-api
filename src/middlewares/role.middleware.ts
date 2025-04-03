import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";


export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.staff?.role !== "admin" && req.staff?.role !== "superadmin") {
     res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export const requireSuperAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.staff?.role !== "superadmin") {
     res.status(403).json({ message: "Super admin access required" });
  }
  next();
};