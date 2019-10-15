const mysql = require('mysql');
const dotenv = require('dotenv').config();


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.SQL_PW,
  database: 'burgers_db'
});

connection.connect((error) => {
  if (error) {
    console.log(`error connecting: ${error.stack}`);
    return;
  }

  console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;