"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdoptionForms_1 = __importDefault(require("./AdoptionForms"));
const userFormRoutes_1 = __importDefault(require("./userFormRoutes"));
const pets_1 = __importDefault(require("./pets"));
const auth_routes_1 = __importDefault(require("./auth-routes"));
const Contact_1 = __importDefault(require("./Contact"));
const router = (0, express_1.Router)();
console.log("Initializing index routes...");
const safeUse = (path, route) => {
    try {
        router.use(path, route);
    }
    catch (error) {
        console.error(`Failed to load route ${path}:`, error);
    }
};
safeUse("/adoption-forms", AdoptionForms_1.default);
safeUse("/users", userFormRoutes_1.default);
safeUse("/pets", pets_1.default);
safeUse("/auth", auth_routes_1.default);
safeUse("/contact", Contact_1.default);
router.stack
    .filter((layer) => layer.route)
    .forEach((layer) => {
    const route = layer.route;
    console.log(`Route: ${Object.keys(route.methods).join(", ").toUpperCase()} ${route.path}`);
});
console.log("Index routes successfully loaded.");
exports.default = router;
