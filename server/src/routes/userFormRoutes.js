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
const auth_1 = require("../middleware/auth");
const models_1 = require("../models"); // ✅ Import from models/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.findAll({
            attributes: ["id", "username", "email", "createdAt"],
        });
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
        const user = yield models_1.User.findByPk(userId, {
            attributes: ["id", "username", "email", "createdAt"],
        });
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json(user);
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
        const user = yield models_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        user.username = username;
        user.email = email;
        yield user.save();
        res.status(200).json({ message: "User profile updated successfully.", user });
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.delete("/user-profile/:userId", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield models_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        yield user.destroy();
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
        const existingSavedPet = yield models_1.UserSavedPets.findOne({
            where: { user_id: userId, pet_id: petId },
        });
        if (existingSavedPet) {
            res.status(400).json({ message: "Pet is already saved." });
            return;
        }
        const savedPet = yield models_1.UserSavedPets.create({ user_id: userId, pet_id: petId });
        res.status(201).json({ message: "Pet saved successfully.", savedPet });
    }
    catch (error) {
        console.error("Error saving pet:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.get("/user-profile/:userId/saved-pets", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const savedPets = yield models_1.UserSavedPets.findAll({
            where: { user_id: userId },
            attributes: ["pet_id", "createdAt"],
        });
        res.status(200).json(savedPets);
    }
    catch (error) {
        console.error("Error fetching saved pets:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield models_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const isPasswordValid = yield user.checkPassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET_KEY || "your_secret_key";
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
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
