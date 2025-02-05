import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user: {
    id: number;
    email: string;
    username: string;
  };
}

interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
  username: string;
}

const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
  console.error("Error: Missing JWT_SECRET_KEY in environment variables.");
  process.exit(1);
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authorization header missing or malformed." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    (req as AuthRequest).user = {
      id: payload.id,
      email: payload.email || "", 
      username: payload.username || "", 
    };

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token." });
    return;
  }
};
