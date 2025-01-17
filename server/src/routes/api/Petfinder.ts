import axios from 'axios';
import express, { Request, Response } from 'express';

const router = express.Router();

const PETFINDER_API_URL = 'https://api.petfinder.com/v2';
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';

let accessToken: string;

const getAccessToken = async () => {
    if (!accessToken) {
        const response = await axios.post(`${PETFINDER_API_URL}/oauth2/token`, {
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        });
        accessToken = response.data.access_token;
    }
    return accessToken;
};

router.get('/pets', async (req: Request, res: Response) => {
    try {
        const token = await getAccessToken();
        const response = await axios.get(`${PETFINDER_API_URL}/animals`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: req.query, // Allow passing filters from the client
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
});

export default router;
