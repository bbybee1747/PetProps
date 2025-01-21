import { query } from '../config/db';
import { seedUsers } from './user-seeds';
import { seedAdoptionForms } from './Adoption-Form-Seeds';

const seedAll = async () => {
    try {
        console.log('Seeding database...');
        
        await seedUsers();
        console.log('Users seeded.');

        await seedAdoptionForms();
        console.log('Adoption forms seeded.');

        console.log('All seeding completed!');
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        process.exit(); 
    }
};

seedAll();
