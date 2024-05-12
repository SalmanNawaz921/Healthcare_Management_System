const { getData } = require("../db/db");

const executeQuery = async (query, parameters, transaction = null,outputColumnName = null) => {
  try {
    const request = transaction
      ? transaction.request()
      : (await getData()).request();
    if (parameters)
      parameters.forEach((parameter) => {
        request.input(parameter.name, parameter.type, parameter.value);
      });

    const result = await request.query(query);
    const hasOutput = query.toUpperCase().includes('OUTPUT');
    let insertedId = null;

    // If the query contains the OUTPUT clause, extract the inserted ID
    if (hasOutput && result.recordset && result.recordset.length > 0) {
      const record = result.recordset[0];
      // Assuming the inserted ID column is named prescriptionid
      insertedId = record?.[outputColumnName];
    }
    return insertedId?insertedId:result.recordset;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

module.exports = { executeQuery };
