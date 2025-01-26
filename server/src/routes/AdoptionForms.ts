import { Router, Request, Response } from "express";
import { query } from "../config/db";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  console.log("Received adoption form submission:", req.body);

  const { user_id, pet_id, pet_name, pet_type, pet_breed, pet_age, reason } = req.body;

  if (!user_id || !pet_id || !pet_name || !pet_type || !pet_breed || !pet_age || !reason) {
    console.error("Validation Failed. Missing required fields.");
    res.status(400).json({ message: "All required fields must be filled." });
    return;
  }

  try {
    const sql = `
      INSERT INTO adoption_forms (
        user_id, pet_id, pet_name, pet_type, pet_breed, pet_age, reason
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, submitted_at;
    `;
    const values = [user_id, pet_id, pet_name, pet_type, pet_breed, pet_age, reason];
    const result = await query(sql, values);

    res.status(201).json({
      message: "Adoption form submitted successfully!",
      formId: result.rows[0].id,
      submittedAt: result.rows[0].submitted_at,
    });
  } catch (err) {
    console.error("Error submitting adoption form:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query("SELECT * FROM adoption_forms ORDER BY submitted_at DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching adoption forms:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/:id", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await query("SELECT * FROM adoption_forms WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Adoption form not found." });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching adoption form:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
