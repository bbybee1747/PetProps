"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSavedPets = exports.AdoptionForm = exports.Pet = exports.User = exports.sequelize = void 0;
const sequelize_js_1 = __importDefault(require("../sequelize.js"));
exports.sequelize = sequelize_js_1.default;
const User_js_1 = require("./User.js");
const pets_js_1 = require("./pets.js");
const AdoptionForm_js_1 = require("./AdoptionForm.js");
const UserSavedPets_js_1 = require("./UserSavedPets.js");
// ✅ Initialize models
const User = (0, User_js_1.UserFactory)(sequelize_js_1.default);
exports.User = User;
const Pet = (0, pets_js_1.PetFactory)(sequelize_js_1.default);
exports.Pet = Pet;
const AdoptionForm = (0, AdoptionForm_js_1.AdoptionFormFactory)(sequelize_js_1.default);
exports.AdoptionForm = AdoptionForm;
const UserSavedPets = (0, UserSavedPets_js_1.UserSavedPetsFactory)(sequelize_js_1.default);
exports.UserSavedPets = UserSavedPets;
// ✅ Define relationships **AFTER** models are initialized
User.hasMany(UserSavedPets, { foreignKey: "user_id", as: "savedPets" });
UserSavedPets.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(AdoptionForm, { foreignKey: "user_id", as: "adoptionForms" });
AdoptionForm.belongsTo(User, { foreignKey: "user_id", as: "user" });
Pet.hasMany(AdoptionForm, { foreignKey: "pet_id", as: "adoptions" });
AdoptionForm.belongsTo(Pet, { foreignKey: "pet_id", as: "pet" });
