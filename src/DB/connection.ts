import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

// POSTGRES_PASSWORD = hola;
// POSTGRES_USER = marcial;
// POSTGRES_DB = store;

const password = process.env.POSTGRES_PASSWORD || "";
const user = process.env.POSTGRES_USER || "";
const dbName = process.env.POSTGRES_DB || "";

export const sequelize = new Sequelize(dbName, user, password, {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

export async function connectDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true, force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
