import { query } from '../config/db';

export const seedUsers = async () => {
    const sql = `
        INSERT INTO "user" (username, email, password_hash)
        VALUES 
            ('john_doe', 'john@example.com', 'hashedpassword1'),
            ('jane_doe', 'jane@example.com', 'hashedpassword2')
        ON CONFLICT (email) DO NOTHING;
    `;
    try {
        await query(sql);
        console.log('Users seeded successfully!');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
};
