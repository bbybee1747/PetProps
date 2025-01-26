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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../config/db");
const auth_1 = require("../middleware/auth");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        res.json(users);
    }
    catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}));
router.get("/user-profile/:userId", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const result = yield (0, db_1.query)('SELECT id, username, email, created_at FROM "user" WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.put("/user-profile/:userId", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { username, email } = req.body;
    if (!username || !email) {
        res.status(400).json({ message: "Username and email are required." });
        return;
    }
    try {
        const sql = `
        UPDATE "user"
        SET username = $1, email = $2
        WHERE id = $3
        RETURNING id, username, email, created_at;
      `;
        const values = [username, email, userId];
        const result = yield (0, db_1.query)(sql, values);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json({
            message: "User profile updated successfully.",
            user: result.rows[0],
        });
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.delete("/user-profile/:userId", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const result = yield (0, db_1.query)('DELETE FROM "user" WHERE id = $1 RETURNING id', [userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json({ message: "User profile deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting user profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.post("/user-profile/:userId/save-pet", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { petId } = req.body;
    if (!petId) {
        res.status(400).json({ message: "Pet ID is required." });
        return;
    }
    try {
        const checkQuery = `
        SELECT * FROM user_saved_pets WHERE user_id = $1 AND pet_id = $2;
      `;
        const checkResult = yield (0, db_1.query)(checkQuery, [userId, petId]);
        if (checkResult.rows.length > 0) {
            res.status(400).json({ message: "Pet is already saved." });
            return;
        }
        const insertQuery = `
        INSERT INTO user_saved_pets (user_id, pet_id)
        VALUES ($1, $2)
        RETURNING id, user_id, pet_id, created_at;
      `;
        const insertResult = yield (0, db_1.query)(insertQuery, [userId, petId]);
        res.status(201).json({
            message: "Pet saved successfully.",
            savedPet: insertResult.rows[0],
        });
    }
    catch (error) {
        console.error("Error saving pet:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.get("/user-profile/:userId/saved-pets", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const sql = `
        SELECT pet_id, created_at
        FROM user_saved_pets
        WHERE user_id = $1
        ORDER BY created_at DESC;
      `;
        const result = yield (0, db_1.query)(sql, [userId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error fetching saved pets:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const userResult = yield (0, db_1.query)('SELECT id, username, password_hash FROM "user" WHERE username = $1', [username]);
        const user = userResult.rows[0];
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
            },
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}));
exports.default = router;
