import { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import { CustomJwtPayload } from './models/user'; 

export interface JwtPayload extends DefaultJwtPayload {
    id: number;
    email: string;
    username?: string;
}

declare module 'jsonwebtoken' {
    export interface JwtPayload extends DefaultJwtPayload {
        id: number;
        email: string;
        username?: string;
    }
}

declare global {
    namespace Express {
        interface Request {
            user?: CustomJwtPayload;
        }
    }
}
