import { Sequelize } from "sequelize";
import dbConfig from "../config/db-config.js";

const sequelize = new Sequelize('cloud', 'developer', 'developer', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;