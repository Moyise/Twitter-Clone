import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret: any = process.env.JWT_SECRET;

const generateToken = (id: string) => {
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

export default generateToken;
