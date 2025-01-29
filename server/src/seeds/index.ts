import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

import { seedUsers } from "./user-seeds";
import { seedAdoptionForms } from "./Adoption-Form-Seeds";

const sequelize = new Sequelize(
  process.env.DB_NAME!, 
  process.env.DB_USER!, 
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST, 
    port: parseInt(process.env.DB_PORT!, 10),
    dialect: "postgres", 
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false, 
      },
    },
    logging: false, 
  }
);

const runSeeds = async () => {
  console.log("Seeding database...");


  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }

  try {
    await seedUsers();
    console.log("Users seeded.");

    await seedAdoptionForms();
    console.log("Adoption forms seeded.");

    console.log("All seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await sequelize.close(); 
  }
};

runSeeds();
