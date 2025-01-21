import { query } from '../config/db';

export const seedAdoptionForms = async () => {
    const sql = `
        INSERT INTO adoption_forms (
            user_id, user_name, user_address, user_phone, user_email, 
            pet_id, pet_name, pet_type, pet_breed, pet_age, reason, status
        )
        VALUES 
        (1, 'John Doe', '123 Maple Street, Springfield', '555-123-4567', 'john1.doe@example.com', 
         1, 'Buddy', 'Dog', 'Golden Retriever', 3, 'I love dogs and want a loyal companion.', 'pending'),
        (2, 'Jane Smith', '456 Oak Avenue, Riverside', '555-987-6543', 'jane.smith@example.com', 
         2, 'Whiskers', 'Cat', 'Siamese', 2, 'I want a playful and independent pet.', 'pending');
    `;
    try {
        await query(sql);
        console.log('Adoption forms seeded successfully!');
    } catch (err) {
        console.error('Error seeding adoption forms:', err);
    }
};

seedAdoptionForms();
