import { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';

export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    created_at: Date;
}

export interface UpdateUser {
    username: string;
    email: string;
}

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    created_at: Date;
}

export interface CustomJwtPayload extends DefaultJwtPayload {
    id: number;
    email: string;
    username: string;
}

