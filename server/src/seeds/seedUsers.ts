import { User } from "../models";

const seedUsers = async () => {
  try {
    console.log("User Model:", User); 

    if (!User) {
      throw new Error("User model is not defined! Check your model exports.");
    }

    await User.bulkCreate([
      {
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
      },
      {
        username: "jane_doe",
        email: "jane@example.com",
        password: "securepassword",
      },
    ]);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

export default seedUsers;
