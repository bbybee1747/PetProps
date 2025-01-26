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
// Logs to confirm routes initialization
console.log("Initializing index routes...");
router.use("/adoption-forms", AdoptionForms_1.default); // Adoption forms routes
router.use("/users", userFormRoutes_1.default); // User-related routes
router.use("/pets", pets_1.default); // Pets-related routes
router.use("/auth", auth_routes_1.default);
router.use("/contact", Contact_1.default);
router.stack.forEach((layer) => {
    if (layer.route) {
        const route = layer.route;
        console.log(`Route: ${Object.keys(route.methods).join(", ").toUpperCase()} ${route.path}`);
    }
});
// Authentication routes
console.log("Index routes successfully loaded.");
exports.default = router;
