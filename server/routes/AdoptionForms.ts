import express from 'express';
const router = express.Router();
const pool = require('./db');


router.get('/adoption-forms', async (req: express.Request, res: express.Response) => {
    try {
        const result = await pool.query('SELECT * FROM adoption_form_with_user_info');
        res.json(result.rows);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;