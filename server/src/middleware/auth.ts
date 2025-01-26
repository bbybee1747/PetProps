import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomJwtPayload } from "../models/User"; 

const JWT_SECRET = process.env.JWT_SECRET_KEY || "your_secret_key";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authorization header missing or malformed." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    req.user = {
      id: payload.id,
      email: payload.email || "", 
      username: payload.username || "", 
    };

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
