"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET_KEY in environment variables.");
}
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authorization header missing or malformed." });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = {
            id: payload.id,
            email: payload.email || "",
            username: payload.username || "",
        };
        next();
    }
    catch (error) {
        console.error("JWT verification failed:", error);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};
exports.authenticateJWT = authenticateJWT;
