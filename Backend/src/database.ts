import { Sequelize } from 'sequelize';
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.PG_DATABASE!,
  username: process.env.PG_USER!,
  password: process.env.PG_PASSWORD!,
  host: process.env.PG_HOST!,
  port: parseInt(process.env.PG_PORT!),
  dialect: 'postgres',
});

export default sequelize;