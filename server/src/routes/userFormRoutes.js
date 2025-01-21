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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../config/db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/user-profile/:userId', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const result = yield (0, db_1.query)('SELECT id, username, email, created_at FROM "user" WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
router.put('/user-profile/:userId', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { username, email } = req.body;
    if (!username || !email) {
        res.status(400).json({ message: 'Username and email are required.' });
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
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.status(200).json({ message: 'User profile updated successfully.', user: result.rows[0] });
    }
    catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
router.delete('/user-profile/:userId', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const result = yield (0, db_1.query)('DELETE FROM "user" WHERE id = $1 RETURNING id', [userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.status(200).json({ message: 'User profile deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
exports.default = router;
