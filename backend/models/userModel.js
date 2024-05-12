const sql = require("mssql");
const bcrypt = require("bcrypt");
const { executeQuery } = require("./genericModel");
const User = {
  async findOne(username, password, role) {
    const query = `SELECT * FROM Users WHERE Username = @username AND Password = @password AND Role = @role`;
    const parameters = [
      { name: "username", type: sql.NVarChar, value: username },
      { name: "password", type: sql.NVarChar, value: password },
      { name: "role", type: sql.Int, value: role },
    ];
    const result = await executeQuery(query, parameters);
    console.log(result);
    return result != null && result.length > 0 ? result[0] : null;
  },

  async updateAdminUsersID(i, id, doctorId, patientId) {
    const query = `UPDATE DoctorDepartmentAssignment SET DoctorId =@id Where DoctorDepartmentAssignment.red=@i`;
    // const query = `UPDATE Doctor SET DoctorId =@i WHERE PatientSymptoms.SymptomID =@i`;
    const parameters = [
      { name: "i", type: sql.Int, value: i },
      { name: "id", type: sql.Int, value: id },
      // { name: "doctorId", type: sql.Int, value: doctorId },
      // { name: "patientId", type: sql.Int, value: patientId },
    ];
    // const query1 = `UPDATE Appointment SET DoctorId =@doctorId, PatientId =@patientId Where AppoinmentId=@i`;
    const result = await executeQuery(query, parameters);
    return result;
  },

  async userExists(username, transaction = null) {
    try {
      const query = `SELECT * FROM Users WHERE Username = @username`;
      const parameters = [
        { name: "username", type: sql.NVarChar, value: username },
      ];
      const result = await executeQuery(query, parameters, transaction);
      console.log(result);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.error("Error finding user:", err);
      throw err;
    }
  },

  async findUser(username, role) {
    const query = `SELECT * FROM Users WHERE Username = @username AND Role = @role`;
    const parameters = [
      { name: "username", type: sql.NVarChar, value: username },
      { name: "role", type: sql.Int, value: role },
    ];
    const result = await executeQuery(query, parameters);
    return result != null && result.length > 0 ? result[0] : null;
  },

  async insertUser(username, password, role, transaction) {
    try {
      const query =
        "INSERT INTO Users (username, password, role) VALUES (@username, @password, @role)";
      const parameters = [
        { name: "username", type: sql.NVarChar, value: username },
        { name: "password", type: sql.NVarChar, value: password },
        { name: "role", type: sql.Int, value: role },
      ];
      await executeQuery(query, parameters, transaction);
      const result = await this.userExists(username, transaction);
      console.log(result);
      return result;
    } catch (err) {
      console.error("An error occurred while inserting user:", err);
      throw err;
    }
  },

  async updateUser(id, username, password) {
    try {
      console.log(id)
      const query = `UPDATE Users SET Password = @password, Username = @username WHERE UserID = @id`;
      const parameters = [
        { name: "id", type: sql.Int, value: id },
        { name: "password", type: sql.NVarChar, value: password },
        { name: "username", type: sql.NVarChar, value: username },
      ];
      await executeQuery(query, parameters);
      return true;
    } catch (err) {
      console.error("An error occurred while updating user:", err);
      throw err;
    }
  },
  // Static method to verify admin password
  async verifyPassword(user, password) {
    try {
      if (user) {
        const auth = await bcrypt.compare(password, user.Password);
        if (auth) {
          // success=true;
          return true;
        }
        return false;
      }
      throw new Error("Invalid User");
    } catch (error) {
      console.error("Error verifying password:", error);
      throw error;
    }
  },
};

module.exports = User;
