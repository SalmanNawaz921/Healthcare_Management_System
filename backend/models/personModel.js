const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");
const { personAttributes } = require("../constants/constants");

const Person = {
  async findById(id, transaction=null) {
    try {
      const query = "SELECT * FROM Person WHERE UserId = @id";
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err; // Optionally rethrow the error to be handled by the caller
    }
  },
  async findByEmail(email) {
    try {
      const query = "SELECT * FROM Person WHERE Email = @email";
      const parameters = [{ name: "email", type: sql.NVarChar, value: email }];
      const result = await executeQuery(query, parameters);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err; // Optionally rethrow the error to be handled by the caller
    }
  },
  async insertPerson(
    userid,
    firstname,
    lastname,
    email,
    dateofbirth,
    gender,
    transaction
  ) {
    try {
      const query =
        "INSERT INTO Person (UserID,FirstName, LastName, Email, DateOfBirth,Gender) VALUES (@userid,@firstname, @lastname, @email, @dateofbirth,@gender);";
      const parameters = [
        { name: "firstname", type: sql.NVarChar, value: firstname },
        { name: "lastname", type: sql.NVarChar, value: lastname },
        { name: "email", type: sql.NVarChar, value: email },
        { name: "dateofbirth", type: sql.Date, value: dateofbirth },
        { name: "gender", type: sql.Int, value: gender },
        { name: "userid", type: sql.Int, value: userid },
      ];

      await executeQuery(query, parameters, transaction);
      const result = await this.findById(userid, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async updatePerson(UserID, params) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `UPDATE Person SET FirstName = COALESCE(@firstname,FirstName), LastName = COALESCE(@lastname,LastName), Email = COALESCE(@email,Email), DateOfBirth = COALESCE(@dateofbirth,DateOfBirth), Address = COALESCE(@address,Address), Gender =COALESCE(@gender,Gender),Contact=COALESCE(@contact,Contact), ZipCode = COALESCE(@zipcode,ZipCode),City=COALESCE(@city,City), State=COALESCE(@state,State), Country=COALESCE(@country,Country) Where UserID = @userID`;
      const parameters = personAttributes(params, UserID);

      await executeQuery(query, parameters, transaction);
      const result = await this.findById(UserID, transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = Person;
