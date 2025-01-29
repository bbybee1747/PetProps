import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import sequelize from "../sequelize"

dotenv.config();

import { seedUsers } from "./user-seeds";
import { seedAdoptionForms } from "./Adoption-Form-Seeds";


const runSeeds = async () => {
  console.log("Seeding database...");



  try {
    await seedUsers();
    console.log("Users seeded.");

    await seedAdoptionForms();
    console.log("Adoption forms seeded.");

    console.log("All seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error); 
  }
};

runSeeds();
