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

export default router;
