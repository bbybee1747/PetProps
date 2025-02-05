"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
exports.PetFactory = PetFactory;
const sequelize_1 = require("sequelize");
class Pet extends sequelize_1.Model {
}
exports.Pet = Pet;
function PetFactory(sequelize) {
    Pet.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        species: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        breed_primary: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        breed_secondary: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        breed_mixed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
        photos: {
            type: sequelize_1.DataTypes.JSONB,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "pets",
        sequelize,
    });
    return Pet;
}
