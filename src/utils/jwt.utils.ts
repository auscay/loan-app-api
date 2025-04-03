import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Staff } from "../models/Staff";

dotenv.config();

const JWT_SECRET: any = process.env.JWT_SECRET
const JWT_EXPIRES_IN: any = process.env.JWT_EXPIRES_IN

export const generateToken = (payload: any) => {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
    return token
}

export const verifyToken = (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
}