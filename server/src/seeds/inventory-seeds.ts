import cat1 from '../../../client/src/assets/alexander-london-mJaD10XeD7w-unsplash.jpg';

const insertPetsQuery = `
INSERT INTO pets (name, age, gender, species, breed_primary, breed_secondary, breed_mixed, photos, description, contact_email, contact_phone, contact_address1, contact_address2, contact_city, contact_state, contact_postcode, status)
VALUES 
('Luna', 'Young', 'Female', 'Cat', 'Domestic Shorthair', NULL, FALSE, '[{"small": ${cat1}, "medium": "medium1.jpg", "large": "large1.jpg", "full": "full1.jpg"}]', 'A sweet and playful young cat.', 'luna@email.com', '123-456-7890', '123 Main St', NULL, 'Springfield', 'IL', '62701', 'Available'),
('Max', 'Adult', 'Male', 'Dog', 'Labrador Retriever', 'Golden Retriever', TRUE, '[{"small": "small2.jpg", "medium": "medium2.jpg", "large": "large2.jpg", "full": "full2.jpg"}]', 'A friendly and energetic dog.', 'max@email.com', NULL, '456 Elm St', 'Apt 4B', 'Lincoln', 'NE', '68510', 'Available'),
('Daisy', 'Senior', 'Female', 'Dog', 'Beagle', NULL, FALSE, '[{"small": "small3.jpg", "medium": "medium3.jpg", "large": "large3.jpg", "full": "full3.jpg"}]', 'A calm and loving senior dog.', NULL, '987-654-3210', '789 Oak St', NULL, 'Harrisburg', 'PA', '17101', 'Adopted'),
('Oliver', 'Baby', 'Male', 'Rabbit', 'Lop-Eared', NULL, FALSE, '[{"small": "small4.jpg", "medium": "medium4.jpg", "large": "large4.jpg", "full": "full4.jpg"}]', 'A tiny and adorable bunny.', 'oliver@email.com', '123-789-4560', NULL, NULL, 'Madison', 'WI', '53703', 'Available'),
('Bella', 'Adult', 'Female', 'Cat', 'Siamese', NULL, FALSE, '[{"small": "small5.jpg", "medium": "medium5.jpg", "large": "large5.jpg", "full": "full5.jpg"}]', 'A beautiful Siamese cat.', NULL, NULL, '321 Maple St', NULL, 'Boulder', 'CO', '80302', 'Available'),
('Charlie', 'Young', 'Male', 'Dog', 'German Shepherd', 'Husky', TRUE, '[{"small": "small6.jpg", "medium": "medium6.jpg", "large": "large6.jpg", "full": "full6.jpg"}]', 'A loyal and intelligent companion.', 'charlie@email.com', '555-123-4567', '654 Pine St', NULL, 'Denver', 'CO', '80203', 'Available'),
('Lily', 'Baby', 'Female', 'Rabbit', 'Dwarf Hotot', NULL, FALSE, '[{"small": "small7.jpg", "medium": "medium7.jpg", "large": "large7.jpg", "full": "full7.jpg"}]', 'An adorable baby rabbit.', NULL, NULL, NULL, NULL, 'Austin', 'TX', '73301', 'Available'),
('Milo', 'Senior', 'Male', 'Cat', 'Maine Coon', NULL, FALSE, '[{"small": "small8.jpg", "medium": "medium8.jpg", "large": "large8.jpg", "full": "full8.jpg"}]', 'A gentle and affectionate senior cat.', 'milo@email.com', '800-555-0199', '987 Walnut St', 'Suite 10', 'Seattle', 'WA', '98101', 'Adopted');
`;
 