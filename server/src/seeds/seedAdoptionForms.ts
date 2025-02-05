import { AdoptionForm } from "../models";

const seedAdoptionForms = async () => {
  try {
    await AdoptionForm.bulkCreate([
      {
        user_id: 1,
        pet_id: 1001,
        pet_name: "Buddy",
        pet_type: "Dog",
        pet_breed: "Labrador Retriever",
        pet_age: 2,
        reason: "Looking for a friendly companion.",
        status: "Pending",
        submitted_at: new Date(),
      },
      {
        user_id: 2,
        pet_id: 1002,
        pet_name: "Mittens",
        pet_type: "Cat",
        pet_breed: "Siamese",
        pet_age: 1,
        reason: "Adopted for companionship.",
        status: "Approved",
        submitted_at: new Date(),
      },
    ]);
    console.log("✅ Adoption Forms seeded successfully!");
  } catch (error) {
    console.error("Error seeding adoption forms:", error);
  }
};

export default seedAdoptionForms;
