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
const user_seeds_1 = require("./user-seeds");
const Adoption_Form_Seeds_1 = require("./Adoption-Form-Seeds");
const runSeeds = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Seeding database...");
    try {
        yield (0, user_seeds_1.seedUsers)();
        console.log("Users seeded.");
        yield (0, Adoption_Form_Seeds_1.seedAdoptionForms)();
        console.log("Adoption forms seeded.");
        console.log("All seeding completed!");
    }
    catch (error) {
        console.error("Error during seeding:", error);
    }
});
runSeeds();
