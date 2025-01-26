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
exports.seedUsers = void 0;
const db_1 = require("../config/db");
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    INSERT INTO "user" (username, email, password_hash, created_at)
    VALUES 
      ('john_doe', 'john@example.com', '$2b$10$v60BmdZVby0NNGojN9eTKe3dhkHem9iu7r.VCWfkWdbAVxGX9Xs/K', NOW()),
      ('jane_doe', 'jane@example.com', '$2b$10$d60BmdZVby0NNGojN9eTKe3dhkHem9iu7r.VCWfkWdbAVxGX9Xs/L', NOW())
    ON CONFLICT DO NOTHING;
  `;
    try {
        yield (0, db_1.query)(sql);
        console.log("Users seeded successfully!");
    }
    catch (err) {
        console.error("Error seeding users:", err);
    }
});
exports.seedUsers = seedUsers;
