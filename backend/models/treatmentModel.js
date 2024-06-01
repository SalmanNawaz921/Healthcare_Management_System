const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");
const { treatmentAttributes } = require("../constants/constants");

const Treatment = {
  async findById(id) {
    const query = `SELECT * FROM Treatment WHERE TreatmentID= @id`;
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result;
  },
  async getAllTreatments(id) {
    const query = `SELECT Treatment.TreatmentID,Treatment.Name,Treatment.Cost, Treatment.Duration, Department.Name AS DepartmentName
    FROM Treatment
    JOIN Department ON Treatment.DepartmentID = Department.DepartmentID
    JOIN DoctorDepartmentAssignment ON Treatment.DepartmentID = DoctorDepartmentAssignment.DepartmentID
    WHERE DoctorDepartmentAssignment.DoctorID =@id;
    `;

    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result;
  },
  async getAllTreatmentsByHospitalAdmin(id, transaction = null) {
    try {
      const query = `SELECT Treatment.TreatmentID,Treatment.Name,Treatment.Cost, Treatment.Duration, Department.Name AS DepartmentName,Department.DepartmentID FROM Treatment JOIN Department ON Treatment.DepartmentID = Department.DepartmentID JOIN Hospital ON Hospital.HospitalID = Department.HospitalID WHERE Hospital.AdminID=@id;
      `;

      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result;
    } catch (error) {}
  },

  async getTreatmentsByDepartment(id) {
    const query = `SELECT * FROM Treatment WHERE DepartmentID=@id`;
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result;
  },

  async addTreatment(params, adminID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `INSERT INTO Treatment (Name, Description,Cost, Duration, DepartmentID) VALUES (@name, @description,@cost, @duration, @departmentID) `;
      const parameters = treatmentAttributes(params);
      await executeQuery(query, parameters, transaction);
      const result = await this.getAllTreatmentsByHospitalAdmin(
        adminID,
        transaction
      );
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async editTreatment(params, id, adminID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `UPDATE Treatment SET Name=COALESCE(@name,Name), Description=COALESCE(@description,Description), Cost=COALESCE(@cost,Cost), Duration=COALESCE(@duration,Duration) WHERE TreatmentID=@id`;
      const parameters = treatmentAttributes(params);
      parameters.push({ name: "id", type: sql.Int, value: id });
      await executeQuery(query, parameters, transaction);
      const result = await this.getAllTreatmentsByHospitalAdmin(
        adminID,
        transaction
      );
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async deleteTreatment(id, adminID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      let query, parameters, result;
      query = `Update Prescription SET TreatmentID=NULL WHERE TreatmentID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters);
      query = `DELETE FROM Treatment WHERE TreatmentID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters);
      result = await this.getAllTreatmentsByHospitalAdmin(adminID);
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = Treatment;
