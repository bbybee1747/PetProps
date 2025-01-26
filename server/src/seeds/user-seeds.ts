import { query } from "../config/db";

export const seedUsers = async () => {
  const sql = `
    INSERT INTO "user" (username, email, password_hash, created_at)
    VALUES 
      ('john_doe', 'john@example.com', '$2b$10$v60BmdZVby0NNGojN9eTKe3dhkHem9iu7r.VCWfkWdbAVxGX9Xs/K', NOW()),
      ('jane_doe', 'jane@example.com', '$2b$10$d60BmdZVby0NNGojN9eTKe3dhkHem9iu7r.VCWfkWdbAVxGX9Xs/L', NOW())
    ON CONFLICT DO NOTHING;
  `;

  try {
    await query(sql);
    console.log("Users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};
