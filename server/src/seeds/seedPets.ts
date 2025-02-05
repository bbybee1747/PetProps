import { Pet } from "../models";

const seedPets = async () => {
  try {
    await Pet.bulkCreate([
      {
        name: "Buddy",
        age: "2 years",
        gender: "Male",
        species: "Dog",
        breed_primary: "Labrador Retriever",
        breed_secondary: null,
        breed_mixed: false,
        photos: [
          { small: "url1", medium: "url2", large: "url3", full: "url4" },
        ],
        description: "Friendly and energetic Labrador.",
        status: "Available",
      },
      {
        name: "Mittens",
        age: "1 year",
        gender: "Female",
        species: "Cat",
        breed_primary: "Siamese",
        breed_secondary: null,
        breed_mixed: false,
        photos: [
          { small: "url1", medium: "url2", large: "url3", full: "url4" },
        ],
        description: "Loves to cuddle and play.",
        status: "Adopted",
      },
    ]);
    console.log("✅ Pets seeded successfully!");
  } catch (error) {
    console.error("Error seeding pets:", error);
  }
};

export default seedPets;
