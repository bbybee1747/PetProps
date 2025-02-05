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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../sequelize"));
const seedUsers_1 = __importDefault(require("./seedUsers"));
const seedPets_1 = __importDefault(require("./seedPets"));
const seedAdoptionForms_1 = __importDefault(require("./seedAdoptionForms"));
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🌱 Starting database seeding...");
        yield sequelize_1.default.sync({ force: true });
        console.log("Database synced!");
        yield (0, seedUsers_1.default)();
        yield (0, seedPets_1.default)();
        yield (0, seedAdoptionForms_1.default)();
        console.log("🎉 Seeding completed successfully!");
    }
    catch (error) {
        console.error("Error during database seeding:", error);
    }
    finally {
        yield sequelize_1.default.close();
        console.log("Database connection closed.");
    }
});
seedDatabase();
