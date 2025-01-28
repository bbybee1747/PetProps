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
const express_1 = __importDefault(require("express"));
const mailersend_1 = require("mailersend");
require("dotenv").config();
const router = express_1.default.Router();
router.post("/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        res.status(400).json({ error: "All fields are required." });
        return;
    }
    try {
        const mailerSend = new mailersend_1.MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY,
        });
        const sentFrom = new mailersend_1.Sender("no-reply@trial-ynrw7gy7e8jg2k8e.mlsender.net", "Pet Props Admin");
        const recipients = [new mailersend_1.Recipient("PetPropsForLife@proton.me", "Pet Props Admin")];
        const emailParams = new mailersend_1.EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject(`Message from ${name}`)
            .setHtml(`<p>${message}</p><p>From: ${name} (${email})</p>`)
            .setText(`${message}\n\nFrom: ${name} (${email})`);
        yield mailerSend.email.send(emailParams);
        res.status(200).json({ message: "Email sent successfully!" });
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
}));
exports.default = router;
