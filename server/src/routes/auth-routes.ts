import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../config/db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your_secret_key';

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: 'All fields are required.' });
        return;
    }

    try {
        const emailCheck = await query('SELECT id FROM "user" WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            res.status(409).json({ message: 'Email is already registered.' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `
            INSERT INTO "user" (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at;
        `;
        const values = [username, email, hashedPassword];
        const result = await query(sql, values);

        res.status(201).json({ 
            message: 'User registered successfully!', 
            user: result.rows[0] 
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' });
        return;
    }

    try {
        const result = await query('SELECT * FROM "user" WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: 'Login successful.', 
            token 
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
