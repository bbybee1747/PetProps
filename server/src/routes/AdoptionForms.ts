import { Router, Request, Response } from "express";
import { AdoptionForm } from "../models";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.post("/", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  console.log("Received adoption form submission:", req.body);

  const { user_id, pet_id, pet_name, pet_type, pet_breed, pet_age, reason } = req.body;

  if (!user_id || !pet_id || !pet_name || !pet_type || !pet_breed || !pet_age || !reason) {
    console.error("Validation Failed. Missing required fields.");
    res.status(400).json({ message: "All required fields must be filled." });
    return;
  }

  try {
    const newForm = await AdoptionForm.create({
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
  } catch (error) {
    console.error("Error submitting adoption form:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const adoptionForms = await AdoptionForm.findAll({
      order: [["submitted_at", "DESC"]],
    });
    res.status(200).json(adoptionForms);
  } catch (error) {
    console.error("Error fetching adoption forms:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/:id", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const adoptionForm = await AdoptionForm.findByPk(id);
    if (!adoptionForm) {
    res.status(404).json({ message: "Adoption form not found." });
      return;
    }
    res.status(200).json(adoptionForm);
  } catch (error) {
    console.error("Error fetching adoption form:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/:id", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const adoptionForm = await AdoptionForm.findByPk(id);
    if (!adoptionForm) {
    res.status(404).json({ message: "Adoption form not found." });
      return;
    }

    adoptionForm.status = status;
    await adoptionForm.save();

    res.json({ message: "Adoption form updated successfully!", adoptionForm });
  } catch (error) {
    console.error("Error updating adoption form:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.delete("/:id", authenticateJWT, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const adoptionForm = await AdoptionForm.findByPk(id);
    if (!adoptionForm) {
      res.status(404).json({ message: "Adoption form not found." });
      return;
    }

    await adoptionForm.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting adoption form:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
