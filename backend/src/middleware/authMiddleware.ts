import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string;

    const { JWT_SECRET }: any = process.env;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded: any = jwt.verify(token, JWT_SECRET);

        req.body.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Not authorized, token failed" });
      }
    }

    if (!token!) {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
