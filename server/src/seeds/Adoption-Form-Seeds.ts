import { query } from "../config/db";

export const seedAdoptionForms = async () => {
  const sql = `
    INSERT INTO adoption_forms (
        id, user_id, pet_id, pet_name, pet_type, pet_breed, pet_age, reason
    )
    VALUES 
        (1, 1, 101, 'Max', 'Dog', 'Golden Retriever', 3, 'Looking for a companion'),
        (2, 2, 102, 'Bella', 'Cat', 'Persian', 2, 'Family pet for kids')
    ON CONFLICT (id) DO NOTHING;
  `;

  try {
    await query(sql);
    console.log("Adoption forms seeded successfully!");
  } catch (err) {
    console.error("Error seeding adoption forms:", err);
  }
};
