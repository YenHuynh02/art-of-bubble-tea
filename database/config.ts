import config from './cred.json';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

const { host, port, user, password, database } = config.database;
const connection = mysql.createConnection({ host, port, user, password });

async function initialize() {
  console.log('Initializing database...');
  await (await connection).changeUser({ database: database });

  await (await connection).execute(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false
  });

  await sequelize.sync({ alter: true });

  console.log('Database initialized.');
};

async function query(sql: string, params: Array<any> = []) {
  const [results, ] = await (await connection).execute(sql, params);

  return results;
}

export {
  initialize,
  query
};