import { query } from './src/config/db/db';

const testConnection = async () => {
    try {
        const result = await query('SELECT NOW()');
        console.log('Database connected:', result.rows[0]);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

testConnection();
