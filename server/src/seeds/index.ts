import { Sequelize } from "sequelize";

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres' 
});
import { seedUsers } from "./user-seeds";
import { seedAdoptionForms } from "./Adoption-Form-Seeds";

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
    await sequelize.close(); // Ensure the database connection is closed
  }
};

runSeeds();
