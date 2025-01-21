"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdoptionForms = void 0;
const db_1 = require("../config/db");
const seedAdoptionForms = () => __awaiter(void 0, void 0, void 0, function* () {
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
        yield (0, db_1.query)(sql);
        console.log('Adoption forms seeded successfully!');
    }
    catch (err) {
        console.error('Error seeding adoption forms:', err);
    }
});
exports.seedAdoptionForms = seedAdoptionForms;
(0, exports.seedAdoptionForms)();
