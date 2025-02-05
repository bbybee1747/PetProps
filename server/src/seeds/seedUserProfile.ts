import { UserProfile } from "../models";
import { User } from "../models";

const seedUserProfiles = async () => {
  try {
    console.log("Seeding user profiles...");

    const users = await User.findAll({ attributes: ["id"] });

    if (users.length < 5) {
      console.log("Not enough users found. Ensure at least 5 users exist.");
      return;
    }

    const profiles = [
      {
        userId: users[0].id,
        bio: "Animal lover and rescue advocate.",
        phoneNumber: "555-111-2222",
        address: "123 Maple Street, Springfield, USA",
        photoUrl: "/profiles/user1.png",
      },
      {
        userId: users[1].id,
        bio: "Passionate about fostering cats and dogs.",
        phoneNumber: "555-333-4444",
        address: "456 Oak Avenue, Riverside, USA",
        photoUrl: "/profiles/user2.png",
      },
      {
        userId: users[2].id,
        bio: "Loves big dogs and adventure.",
        phoneNumber: "555-555-6666",
        address: "789 Birch Road, Mountain View, USA",
        photoUrl: "/profiles/user3.png",
      },
      {
        userId: users[3].id,
        bio: "Experienced pet trainer and dog mom.",
        phoneNumber: "555-777-8888",
        address: "101 Pine Lane, Sunset Valley, USA",
        photoUrl: "/profiles/user4.png",
      },
      {
        userId: users[4].id,
        bio: "Veterinarian and animal welfare advocate.",
        phoneNumber: "555-999-0000",
        address: "222 Cedar Blvd, Greenfield, USA",
        photoUrl: "/profiles/user5.png",
      },
    ];

    await UserProfile.bulkCreate(profiles, { ignoreDuplicates: true });

    console.log("User profiles seeded successfully!");
  } catch (error) {
    console.error("Error seeding user profiles:", error);
  }
};

export default seedUserProfiles;
