"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionForm = void 0;
exports.AdoptionFormFactory = AdoptionFormFactory;
const sequelize_1 = require("sequelize");
class AdoptionForm extends sequelize_1.Model {
}
exports.AdoptionForm = AdoptionForm;
function AdoptionFormFactory(sequelize) {
    AdoptionForm.init({
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
            references: {
                model: "pets",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        pet_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        pet_type: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        pet_breed: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        pet_age: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pending",
        },
        submitted_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        tableName: "adoption_forms",
        sequelize,
        timestamps: true,
    });
    return AdoptionForm;
}
