import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_URL, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

if (!DB_URL && (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT)) {
  console.error("Missing required database environment variables.");
  process.exit(1); 
}

const sequelize = DB_URL
  ? new Sequelize(DB_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize(DB_NAME as string, DB_USER as string, DB_PASSWORD as string, {
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

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `✅ Database connected successfully using ${DB_URL ? "DB_URL" : "DB_HOST"}`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); 
  }
})();

export default sequelize;
