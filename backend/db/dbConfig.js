const dotenv = require("dotenv");
dotenv.config({
  path: "./.env", //give .env file location
});
const config = {
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  server: process.env.SERVER_NAME,
  database: process.env.DATABASE,
  requestTimeout: 300000,
  options: {
    trustServerCertificate: true,
    //encrypt: true, // If your SQL Server instance requires encryption
    trustedConnection: false,
    enableArithAbort: true,
  },
  port: parseInt(process.env.DBPORT) || 1433, // Default port is 1433
};

module.exports = config;
