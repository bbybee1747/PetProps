"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your_secret_key';
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: 'All fields are required.' });
        return;
    }
    try {
        const emailCheck = yield (0, db_1.query)('SELECT id FROM "user" WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            res.status(409).json({ message: 'Email is already registered.' });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const sql = `
            INSERT INTO "user" (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at;
        `;
        const values = [username, email, hashedPassword];
        const result = yield (0, db_1.query)(sql, values);
        res.status(201).json({
            message: 'User registered successfully!',
            user: result.rows[0]
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' });
        return;
    }
    try {
        const result = yield (0, db_1.query)('SELECT * FROM "user" WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }
        const user = result.rows[0];
        const isMatch = yield bcrypt_1.default.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful.',
            token
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
exports.default = router;
