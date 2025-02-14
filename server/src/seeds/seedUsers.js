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
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("User Model:", models_1.User);
        if (!models_1.User) {
            throw new Error("User model is not defined! Check your model exports.");
        }
        yield models_1.User.bulkCreate([
            {
                username: "admin",
                email: "john@example.com",
                password: "admin123",
            },
            {
                username: "jane_doe",
                email: "jane@example.com",
                password: "securepassword",
            },
        ]);
        console.log("Users seeded successfully!");
    }
    catch (error) {
        console.error("Error seeding users:", error);
    }
});
exports.default = seedUsers;
