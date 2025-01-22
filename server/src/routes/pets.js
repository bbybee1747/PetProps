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
    var _a;
    try {
        const { age, gender, species, location, distance, page = 1 } = req.query;
        const limit = 9;
        const token = yield (0, tokenManager_1.fetchAccessToken)();
        if (!token) {
            throw new Error("Unable to retrieve access token");
        }
        const params = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ page,
            limit }, (age && { age })), (gender && { gender })), (species && { type: species })), (location && { location })), (distance && { distance }));
        const { data } = yield axios_1.default.get("https://api.petfinder.com/v2/animals", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        });
        const pets = data.animals.map((animal) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            return ({
                id: animal.id,
                name: animal.name,
                age: animal.age,
                gender: animal.gender,
                species: animal.species,
                breed: {
                    primary: (_a = animal.breeds) === null || _a === void 0 ? void 0 : _a.primary,
                    secondary: (_b = animal.breeds) === null || _b === void 0 ? void 0 : _b.secondary,
                    mixed: (_c = animal.breeds) === null || _c === void 0 ? void 0 : _c.mixed,
                },
                photos: animal.photos.map((photo) => ({
                    small: photo.small,
                    medium: photo.medium,
                    large: photo.large,
                    full: photo.full,
                })),
                description: animal.description || "",
                contact: {
                    email: ((_d = animal.contact) === null || _d === void 0 ? void 0 : _d.email) || null,
                    phone: ((_e = animal.contact) === null || _e === void 0 ? void 0 : _e.phone) || null,
                    address: {
                        address1: ((_g = (_f = animal.contact) === null || _f === void 0 ? void 0 : _f.address) === null || _g === void 0 ? void 0 : _g.address1) || null,
                        address2: ((_j = (_h = animal.contact) === null || _h === void 0 ? void 0 : _h.address) === null || _j === void 0 ? void 0 : _j.address2) || null,
                        city: ((_l = (_k = animal.contact) === null || _k === void 0 ? void 0 : _k.address) === null || _l === void 0 ? void 0 : _l.city) || null,
                        state: ((_o = (_m = animal.contact) === null || _m === void 0 ? void 0 : _m.address) === null || _o === void 0 ? void 0 : _o.state) || null,
                        postcode: ((_q = (_p = animal.contact) === null || _p === void 0 ? void 0 : _p.address) === null || _q === void 0 ? void 0 : _q.postcode) || null,
                    },
                },
                status: animal.status,
            });
        });
        res.status(200).json(pets);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error fetching pets:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            res.status(500).json({ message: "Error fetching pets from Petfinder API." });
        }
        else {
            console.error("Error fetching pets:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}));
exports.default = router;
