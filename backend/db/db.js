const config = require("./dbConfig");
const sql = require("mssql");

const getData = async () => {
  try {
    let pool = await sql.connect(config);
    return pool;
  } catch (error) {
  }
};

module.exports = { getData };
