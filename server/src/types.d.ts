import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends DefaultJwtPayload {
  id: number;
  email: string;
  username?: string;
}

declare module 'nodemailer';


declare module "jsonwebtoken" {
  export interface JwtPayload extends CustomJwtPayload {}
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}
