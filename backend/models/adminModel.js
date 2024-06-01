const { getData } = require("../db/db");
const User = require("../models/userModel");
const Person = require("../models/personModel");
const sql = require("mssql");
const { executeQuery } = require("./genericModel");

// Admin schema definition (similar to Mongoose schema)

// Define a model object for Admin
const Admin = {
  async findById(id, transaction = null) {
    try {
      const query = "SELECT * FROM Admin WHERE UserID = @id";
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err;
    }
  },

  async getAdmin(id) {
    const query =
      "SELECT Person.*,Users.Username FROM Users JOIN Person ON Users.UserID = Person.UserID WHERE Users.UserID = @id";
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result != null && result.length > 0 ? result[0] : null;
  },
  async getAllAdmins() {
    const pool = await getData();
    const result = await pool.query`SELECT * FROM Person Where UserID= ${id}`;
    return result.recordset;
  },

  async getAllEarnings() {
    try {
      const query = ` SELECT  Hospital.Name, SUM(Invoice.TotalAmount) AS Earnings, Hospital.Contact, Hospital.Email FROM Hospital JOIN Department ON Department.HospitalID = Hospital.HospitalID JOIN DoctorDepartmentAssignment ON DoctorDepartmentAssignment.DepartmentID = Department.DepartmentID JOIN Doctor ON DoctorDepartmentAssignment.DoctorID = Doctor.DoctorID JOIN Prescription ON Prescription.DoctorID = Doctor.DoctorID JOIN Invoice ON Invoice.InvoiceID = Prescription.PrescriptionID  GROUP BY Hospital.Name,Hospital.Contact,Hospital.Email`;

      const result = await executeQuery(query);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getAllEarningsByMonth(){
    try {
      const query = `SELECT Hospital.Name, SUM(Invoice.TotalAmount) AS Earnings, Invoice.DateIssued AS Date FROM Hospital JOIN Department ON Department.HospitalID = Hospital.HospitalID JOIN DoctorDepartmentAssignment ON DoctorDepartmentAssignment.DepartmentID = Department.DepartmentID JOIN Doctor ON DoctorDepartmentAssignment.DoctorID = Doctor.DoctorID JOIN Prescription ON Prescription.DoctorID = Doctor.DoctorID JOIN Invoice ON Invoice.InvoiceID = Prescription.PrescriptionID GROUP BY Hospital.Name, Invoice.DateIssued`;
      const result = await executeQuery(query);
      return result;
    } catch (error) {
      throw error;
    }
  
  },

  async getByUserId(id) {
    try {
      const query = "SELECT * FROM Users Where UserID = @id";
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err;
    }
  },

  async register(
    username,
    password,
    firstname,
    lastname,
    email,
    dateofBirth,
    gender,
    role
  ) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const user = await User.insertUser(username, password, role, transaction);
      let userId = user.UserID;
      const person = await Person.insertPerson(
        userId,
        firstname,
        lastname,
        email,
        dateofBirth,
        gender,
        transaction
      );

      const admin = await this.insertAdmin(person.UserID, transaction);
      let adminId = admin.AdminID;
      const query =
        "SELECT Users.UserName, Users.UserID, Person.Email, CONCAT (Person.FirstName,' ',Person.LastName) AS Name, Admin.JoinDate FROM Admin JOIN Person ON Person.UserID = @userId JOIN Users ON Users.UserID = @userId WHERE Admin.AdminID=@adminId";
      const parameters = [
        { name: "userId", type: sql.Int, value: userId },
        { name: "adminId", type: sql.Int, value: adminId },
      ];
      const result = await executeQuery(query, parameters, transaction);
      await transaction.commit();
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      await transaction.rollback();
    }
  },

  async insertAdmin(UserID, transaction) {
    try {
      const query =
        "INSERT INTO Admin (UserID,JoinDate) VALUES (@UserID,GETDATE())";
      const parameters = [{ name: "UserID", type: sql.Int, value: UserID }];
      await executeQuery(query, parameters, transaction);
      const res = await this.findById(UserID, transaction);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Admin;
