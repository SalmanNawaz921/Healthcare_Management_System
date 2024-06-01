const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");
const { hospitalAttributes } = require("../constants/constants");

const HospitalAdmin = {
  async findById(id, transaction = null) {
    try {
      const query = `SELECT * FROM Hospital WHERE HospitalID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err;
    }
  },
  async findByUserId(id) {
    try {
      const query = "SELECT * FROM Admin WHERE Admin.AdminID = @id";
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err;
    }
  },

  async getAllAdmins() {
    const query = `SELECT Admin.AdminID, Admin.OfficeLocation, Admin.Salary, Admin.Notes,CONCAT(Person.FirstName,
      ' ',Person.LastName) As Name, Lookup.Value As Gender, Person.Address, Person.CNIC, Person.Contact, Person.Email, DateDiff(Year,Person.DateOfBirth,GETDATE()) AS Age, Person.ZipCode, Admin.JoinDate,Person.State,Person.Img, Person.City,Person.Country,Users.Username FROM Person JOIN Admin ON Admin.AdminID = Person.UserID JOIN Users ON Person.UserID = Users.UserID JOIN Lookup ON Lookup.Id = Person.Gender`;
    const result = await executeQuery(query);
    return result;
  },
  async getHospitalAdminDetails(id) {
    const query =
      "SELECT Admin.AdminID, Admin.OfficeLocation, Admin.JoinDate, Admin.Salary, Admin.Notes, Person.FirstName, Person.LastName, Lookup.Value As Gender, Person.Address, Person.CNIC, Person.Contact, Person.Email, Person.DateOfBirth, Person.ZipCode, Person.State,Person.Img, Person.City,Person.Country,Users.Username,Hospital.HospitalID, Hospital.Name AS HospitalName, Hospital.Location AS HospitalLocation, Hospital.Website FROM Admin JOIN Person ON Admin.AdminID = Person.UserID JOIN Users ON Admin.AdminID = Users.UserID JOIN Lookup ON Lookup.Id = Person.Gender JOIN Hospital ON Hospital.AdminID = Admin.AdminID WHERE Admin.AdminID = @id;";
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result != null && result.length > 0 ? result[0] : null;
  },
};

module.exports = HospitalAdmin;
