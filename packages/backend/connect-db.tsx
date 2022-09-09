import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const sequelizeOptions: SequelizeOptions = {
  host: "localhost",
  port: 5432,
  username: "russiancmo",
  password: "3tr879m306",
  database: "cairo",
  dialect: "postgres",
};

export const sequelize = new Sequelize(sequelizeOptions);
