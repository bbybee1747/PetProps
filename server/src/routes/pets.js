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
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const tokenManager_1 = require("../middleware/tokenManager");
const router = (0, express_1.Router)();
console.log("Pets routes initialized");
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { age, gender, species, status, page = 1 } = req.query;
        const token = yield (0, tokenManager_1.fetchAccessToken)();
        if (!token) {
            throw new Error("Unable to retrieve access token");
        }
        const params = {
            age,
            gender,
            species,
            status,
            page,
        };
        const { data } = yield axios_1.default.get("https://api.petfinder.com/v2/animals", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        });
        const pets = data.animals.map((animal) => ({
            id: animal.id,
            name: animal.name,
            age: animal.age,
            gender: animal.gender,
            species: animal.species,
            breed: {
                primary: animal.breeds.primary,
                secondary: animal.breeds.secondary,
                mixed: animal.breeds.mixed,
            },
            photos: animal.photos.map((photo) => ({
                small: photo.small,
                medium: photo.medium,
                large: photo.large,
                full: photo.full,
            })),
            description: animal.description || "",
            contact: {
                email: animal.contact.email || null,
                phone: animal.contact.phone || null,
                address: {
                    address1: animal.contact.address.address1 || null,
                    address2: animal.contact.address.address2 || null,
                    city: animal.contact.address.city || null,
                    state: animal.contact.address.state || null,
                    postcode: animal.contact.address.postcode || null,
                },
            },
            status: animal.status,
        }));
        res.status(200).json(pets);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching pets:", error.message);
        }
        else {
            console.error("Error fetching pets:", error);
        }
        res.status(500).json({
            message: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
}));
exports.default = router;
