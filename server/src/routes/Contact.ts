import express, { Request, Response } from "express";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
require("dotenv").config();

const router = express.Router();

router.post("/send-email", async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  try {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY!,
    });

    const sentFrom = new Sender("no-reply@trial-ynrw7gy7e8jg2k8e.mlsender.net", "Pet Props Admin");

    const recipients = [new Recipient("PetPropsForLife@proton.me", "Pet Props Admin")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`Message from ${name}`)
      .setHtml(`<p>${message}</p><p>From: ${name} (${email})</p>`)
      .setText(`${message}\n\nFrom: ${name} (${email})`);

    await mailerSend.email.send(emailParams);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

export default router;
