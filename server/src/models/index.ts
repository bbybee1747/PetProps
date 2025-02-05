import sequelize from "../sequelize.js";
import { UserFactory } from "./User.js";
import { PetFactory } from "./pets.js";
import { AdoptionFormFactory } from "./AdoptionForm.js";
import { UserSavedPetsFactory } from "./UserSavedPets.js";
import { UserProfileFactory } from "./userProfile.js";
import  Sequelize  from "../sequelize.js";

const User = UserFactory(sequelize);
const Pet = PetFactory(sequelize);
const AdoptionForm = AdoptionFormFactory(sequelize);
const UserSavedPets = UserSavedPetsFactory(sequelize);
const UserProfile = UserProfileFactory(sequelize); 

User.hasMany(UserSavedPets, { foreignKey: "user_id", as: "savedPets" });
UserSavedPets.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(AdoptionForm, { foreignKey: "user_id", as: "adoptionForms" });
AdoptionForm.belongsTo(User, { foreignKey: "user_id", as: "user" });

Pet.hasMany(AdoptionForm, { foreignKey: "pet_id", as: "adoptions" });
AdoptionForm.belongsTo(Pet, { foreignKey: "pet_id", as: "pet" });

User.hasOne(UserProfile, { foreignKey: "userId", as: "profile", onDelete: "CASCADE" });
UserProfile.belongsTo(User, { foreignKey: "userId", as: "user" });

export { sequelize, User, Pet, AdoptionForm, UserSavedPets, UserProfile };
