import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { config } from './config/env';

const sequelizeOptions: SequelizeOptions = {
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);
