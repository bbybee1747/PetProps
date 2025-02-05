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
const seedPets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Pet.bulkCreate([
            {
                name: "Buddy",
                age: "2 years",
                gender: "Male",
                species: "Dog",
                breed_primary: "Labrador Retriever",
                breed_secondary: null,
                breed_mixed: false,
                photos: [
                    { small: "url1", medium: "url2", large: "url3", full: "url4" },
                ],
                description: "Friendly and energetic Labrador.",
                status: "Available",
            },
            {
                name: "Mittens",
                age: "1 year",
                gender: "Female",
                species: "Cat",
                breed_primary: "Siamese",
                breed_secondary: null,
                breed_mixed: false,
                photos: [
                    { small: "url1", medium: "url2", large: "url3", full: "url4" },
                ],
                description: "Loves to cuddle and play.",
                status: "Adopted",
            },
        ]);
        console.log("✅ Pets seeded successfully!");
    }
    catch (error) {
        console.error("Error seeding pets:", error);
    }
});
exports.default = seedPets;
