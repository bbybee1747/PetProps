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
const models_1 = require("../models");
const seedAdoptionForms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.AdoptionForm.bulkCreate([
            {
                user_id: 1,
                pet_id: 1001,
                pet_name: "Buddy",
                pet_type: "Dog",
                pet_breed: "Labrador Retriever",
                pet_age: 2,
                reason: "Looking for a friendly companion.",
                status: "Pending",
                submitted_at: new Date(),
            },
            {
                user_id: 2,
                pet_id: 1002,
                pet_name: "Mittens",
                pet_type: "Cat",
                pet_breed: "Siamese",
                pet_age: 1,
                reason: "Adopted for companionship.",
                status: "Approved",
                submitted_at: new Date(),
            },
        ]);
        console.log("✅ Adoption Forms seeded successfully!");
    }
    catch (error) {
        console.error("Error seeding adoption forms:", error);
    }
});
exports.default = seedAdoptionForms;
