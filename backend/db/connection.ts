import * as mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const portNumber = parseInt(process.env.MYSQLDB_LOCAL_PORT || '', 10);

const connection = mysql.createPool({
  host: process.env.MYSQLDB_HOST,
  port: portNumber,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  multipleStatements: true
});

export default connection;