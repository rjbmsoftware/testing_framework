import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
  user: 'snipeit_user',
  database: 'snipeit',
  password: 'snipeit_password'
};

const conn = mysql.createConnection(access);

export { conn };
