import sequelize from "../sequelize.js";
import { UserFactory } from "./User.js";
import { PetFactory } from "./pets.js";
import { AdoptionFormFactory } from "./AdoptionForm.js";
import { UserSavedPetsFactory } from "./UserSavedPets.js";

// ✅ Initialize models
const User = UserFactory(sequelize);
const Pet = PetFactory(sequelize);
const AdoptionForm = AdoptionFormFactory(sequelize);
const UserSavedPets = UserSavedPetsFactory(sequelize);

// ✅ Define relationships **AFTER** models are initialized
User.hasMany(UserSavedPets, { foreignKey: "user_id", as: "savedPets" });
UserSavedPets.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(AdoptionForm, { foreignKey: "user_id", as: "adoptionForms" });
AdoptionForm.belongsTo(User, { foreignKey: "user_id", as: "user" });

Pet.hasMany(AdoptionForm, { foreignKey: "pet_id", as: "adoptions" });
AdoptionForm.belongsTo(Pet, { foreignKey: "pet_id", as: "pet" });

// ✅ Export initialized models
export { sequelize, User, Pet, AdoptionForm, UserSavedPets };
