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
const express_1 = require("express");
const models_1 = require("../models");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received adoption form submission:", req.body);
    const { user_id, pet_id, pet_name, pet_type, pet_breed, pet_age, reason } = req.body;
    if (!user_id || !pet_id || !pet_name || !pet_type || !pet_breed || !pet_age || !reason) {
        console.error("Validation Failed. Missing required fields.");
        res.status(400).json({ message: "All required fields must be filled." });
        return;
    }
    try {
        const newForm = yield models_1.AdoptionForm.create({
            user_id,
            pet_id,
            pet_name,
            pet_type,
            pet_breed,
            pet_age,
            reason,
            status: "Pending",
            submitted_at: new Date(),
        });
        res.status(201).json({
            message: "Adoption form submitted successfully!",
            formId: newForm.id,
            submittedAt: newForm.submitted_at,
        });
    }
    catch (error) {
        console.error("Error submitting adoption form:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.get("/", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adoptionForms = yield models_1.AdoptionForm.findAll({
            order: [["submitted_at", "DESC"]],
        });
        res.status(200).json(adoptionForms);
    }
    catch (error) {
        console.error("Error fetching adoption forms:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.get("/:id", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const adoptionForm = yield models_1.AdoptionForm.findByPk(id);
        if (!adoptionForm) {
            res.status(404).json({ message: "Adoption form not found." });
            return;
        }
        res.status(200).json(adoptionForm);
    }
    catch (error) {
        console.error("Error fetching adoption form:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.put("/:id", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const adoptionForm = yield models_1.AdoptionForm.findByPk(id);
        if (!adoptionForm) {
            res.status(404).json({ message: "Adoption form not found." });
            return;
        }
        adoptionForm.status = status;
        yield adoptionForm.save();
        res.json({ message: "Adoption form updated successfully!", adoptionForm });
    }
    catch (error) {
        console.error("Error updating adoption form:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
router.delete("/:id", auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const adoptionForm = yield models_1.AdoptionForm.findByPk(id);
        if (!adoptionForm) {
            res.status(404).json({ message: "Adoption form not found." });
            return;
        }
        yield adoptionForm.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting adoption form:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
exports.default = router;
