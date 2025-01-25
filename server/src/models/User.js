"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});
class User extends sequelize_2.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'User',
});
exports.default = User;
