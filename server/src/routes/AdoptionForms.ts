import { Router, Request, Response } from 'express';
import { query } from '../config/db';
import { authenticateJWT } from '../middleware/auth';
import { AdoptionForm } from '../models/AdoptionForm';

const router = Router();

// Create a new adoption form
router.post('/adoption-forms', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const {
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
    } = req.body;

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

        const result = await query(sql, values);
        res.status(201).json({
            message: 'Adoption form submitted successfully!',
            formId: result.rows[0].id,
            submittedAt: result.rows[0].submitted_at,
        });
    } catch (err) {
        console.error('Error submitting adoption form:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Get all adoption forms (admin or authorized users)
router.get('/adoption-forms', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await query('SELECT * FROM adoption_forms ORDER BY submitted_at DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching adoption forms:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Get a single adoption form by ID
router.get('/adoption-forms/:id', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await query('SELECT * FROM adoption_forms WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Adoption form not found.' });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching adoption form:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Update the status of an adoption form
router.put('/adoption-forms/:id', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
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
        const result = await query(sql, [status, id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Adoption form not found.' });
            return;
        }

        res.status(200).json({
            message: 'Adoption form updated successfully.',
            adoptionForm: result.rows[0],
        });
    } catch (err) {
        console.error('Error updating adoption form:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Delete an adoption form
router.delete('/adoption-forms/:id', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await query('DELETE FROM adoption_forms WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Adoption form not found.' });
            return;
        }

        res.status(200).json({ message: 'Adoption form deleted successfully.' });
    } catch (err) {
        console.error('Error deleting adoption form:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
