import { Router, Request, Response } from 'express';
import { query } from '../config/db';
import { authenticateJWT } from '../middleware/auth';
import { UpdateUser } from '../models/User';

const router = Router();

router.get('/user-profile/:userId', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const result = await query('SELECT id, username, email, created_at FROM "user" WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.put('/user-profile/:userId', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { username, email }: UpdateUser = req.body;

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
        const result = await query(sql, values);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.status(200).json({ message: 'User profile updated successfully.', user: result.rows[0] });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.delete('/user-profile/:userId', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const result = await query('DELETE FROM "user" WHERE id = $1 RETURNING id', [userId]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.status(200).json({ message: 'User profile deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/user-profile/:userId/save-pet', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { petId } = req.body;

    if (!petId) {
        res.status(400).json({ message: 'Pet ID is required.' });
        return;
    }

    try {
        const checkQuery = `
            SELECT * FROM user_saved_pets WHERE user_id = $1 AND pet_id = $2;
        `;
        const checkResult = await query(checkQuery, [userId, petId]);

        if (checkResult.rows.length > 0) {
            res.status(400).json({ message: 'Pet is already saved.' });
            return;
        }

        const insertQuery = `
            INSERT INTO user_saved_pets (user_id, pet_id)
            VALUES ($1, $2)
            RETURNING id, user_id, pet_id, created_at;
        `;
        const insertResult = await query(insertQuery, [userId, petId]);

        res.status(201).json({
            message: 'Pet saved successfully.',
            savedPet: insertResult.rows[0],
        });
    } catch (error) {
        console.error('Error saving pet:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/user-profile/:userId/saved-pets', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const sql = `
            SELECT pet_id, created_at
            FROM user_saved_pets
            WHERE user_id = $1
            ORDER BY created_at DESC;
        `;
        const result = await query(sql, [userId]);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching saved pets:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



export default router;
