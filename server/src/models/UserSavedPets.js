"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSavedPets = void 0;
exports.UserSavedPetsFactory = UserSavedPetsFactory;
const sequelize_1 = require("sequelize");
class UserSavedPets extends sequelize_1.Model {
}
exports.UserSavedPets = UserSavedPets;
function UserSavedPetsFactory(sequelize) {
    UserSavedPets.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        pet_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        tableName: "user_saved_pets",
        sequelize,
        timestamps: false,
    });
    return UserSavedPets;
}
