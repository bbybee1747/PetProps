import sequelize from "../sequelize";
import seedUsers from "./seedUsers";
import seedPets from "./seedPets";
import seedUserProfiles from "./seedUserProfile";


const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");
  
    await sequelize.sync({ force: true }); 

    console.log("Database synced!");

    await seedUsers();
    await seedPets();
    await seedUserProfiles();
  

    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("Error during database seeding:", error);
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
};

seedDatabase();
