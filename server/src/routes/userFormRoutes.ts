import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticateJWT } from "../middleware/auth";
import { User, UserSavedPets } from "../models"; // ✅ Import from models/index.ts
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "createdAt"],
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/user-profile/:userId", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "createdAt"],
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/user-profile/:userId", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400).json({ message: "Username and email are required." });
    return;
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    user.username = username;
    user.email = email;
    await user.save();

    res.status(200).json({ message: "User profile updated successfully.", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.delete("/user-profile/:userId", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    await user.destroy();
    res.status(200).json({ message: "User profile deleted successfully." });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/user-profile/:userId/save-pet", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { petId } = req.body;

  if (!petId) {
    res.status(400).json({ message: "Pet ID is required." });
    return;
  }

  try {
    const existingSavedPet = await UserSavedPets.findOne({
      where: { user_id: userId, pet_id: petId },
    });

    if (existingSavedPet) {
      res.status(400).json({ message: "Pet is already saved." });
      return;
    }

    const savedPet = await UserSavedPets.create({ user_id: userId, pet_id: petId });

    res.status(201).json({ message: "Pet saved successfully.", savedPet });
  } catch (error) {
    console.error("Error saving pet:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/user-profile/:userId/saved-pets", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const savedPets = await UserSavedPets.findAll({
      where: { user_id: userId },
      attributes: ["pet_id", "createdAt"],
    });

    res.status(200).json(savedPets);
  } catch (error) {
    console.error("Error fetching saved pets:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const JWT_SECRET: string = process.env.JWT_SECRET_KEY || "your_secret_key";
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
