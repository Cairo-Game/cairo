import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const sequelizeOptions: SequelizeOptions = {
  host: "postgres",
  port: 5432,
  username: "russiancmo",
  password: "3tr879m306",
  database: "cairo",
  dialect: "postgres",
};

const sequelize = new Sequelize(sequelizeOptions);

export async function connectToDb() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
