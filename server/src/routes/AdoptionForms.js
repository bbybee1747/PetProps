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
// Create a new adoption form
router.post('/adoption-forms', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, user_name, user_address, user_phone, user_email, pet_id, pet_name, pet_type, pet_breed, pet_age, reason, } = req.body;
    if (!user_id || !user_name || !user_address || !user_phone || !user_email || !pet_id || !reason) {
        res.status(400).json({ message: 'All required fields must be filled.' });
        return;
    }
    try {
        const sql = `
            INSERT INTO adoption_forms (
                user_id, user_name, user_address, user_phone, user_email,
                pet_id, pet_name, pet_type, pet_breed, pet_age, reason
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id, submitted_at;
        `;
        const values = [
            user_id,
            user_name,
            user_address,
            user_phone,
            user_email,
            pet_id,
            pet_name,
            pet_type,
            pet_breed,
            pet_age,
            reason,
        ];
        const result = yield (0, db_1.query)(sql, values);
        res.status(201).json({
            message: 'Adoption form submitted successfully!',
            formId: result.rows[0].id,
            submittedAt: result.rows[0].submitted_at,
        });
    }
    catch (err) {
        console.error('Error submitting adoption form:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
// Get all adoption forms (admin or authorized users)
router.get('/adoption-forms', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)('SELECT * FROM adoption_forms ORDER BY submitted_at DESC');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error fetching adoption forms:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
// Get a single adoption form by ID
router.get('/adoption-forms/:id', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield (0, db_1.query)('SELECT * FROM adoption_forms WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Adoption form not found.' });
            return;
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error fetching adoption form:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
// Update the status of an adoption form
router.put('/adoption-forms/:id', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        res.status(400).json({ message: 'Status is required.' });
        return;
    }
    try {
        const sql = `
            UPDATE adoption_forms
            SET status = $1
            WHERE id = $2
            RETURNING id, status, submitted_at;
        `;
        const result = yield (0, db_1.query)(sql, [status, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Adoption form not found.' });
            return;
        }
        res.status(200).json({
            message: 'Adoption form updated successfully.',
            adoptionForm: result.rows[0],
        });
    }
    catch (err) {
        console.error('Error updating adoption form:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
// Delete an adoption form
router.delete('/adoption-forms/:id', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield (0, db_1.query)('DELETE FROM adoption_forms WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Adoption form not found.' });
            return;
        }
        res.status(200).json({ message: 'Adoption form deleted successfully.' });
    }
    catch (err) {
        console.error('Error deleting adoption form:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
exports.default = router;
