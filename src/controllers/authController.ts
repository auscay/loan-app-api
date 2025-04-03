import { Request, Response } from "express";
import { staffData } from "../models/Staff";
import { generateToken } from "../utils/jwt.utils";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const staff = staffData.find(
      (s) => s.email === email && s.password === password
    );

    if (!staff) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = await generateToken({
      id: staff.id,
      email: staff.email,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: staff.id,
        email: staff.email,
        role: staff.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the token from the client-side
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};