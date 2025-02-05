"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_URL, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
if (!DB_URL && (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT)) {
    console.error("Missing required database environment variables.");
    process.exit(1);
}
const sequelize = DB_URL
    ? new sequelize_1.Sequelize(DB_URL, {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    })
    : new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: parseInt(DB_PORT || "5432", 10),
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log(`✅ Database connected successfully using ${DB_URL ? "DB_URL" : "DB_HOST"}`);
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
}))();
exports.default = sequelize;
