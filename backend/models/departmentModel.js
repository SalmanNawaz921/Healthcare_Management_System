const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");
const {
  hospitalAttributes,
  departmentAttributes,
} = require("../constants/constants");

const Department = {
  async findById(id, transaction = null) {
    try {
      const query = `SELECT * FROM Department WHERE DepartmentID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err;
    }
  },
  async findHospitalID(id, transaction = null) {
    try {
      const query = `SELECT HospitalID FROM Hospital WHERE AdminID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err;
    }
  },
  async getAllDepartments(id, transaction = null) {
    try {
      const query = `SELECT Department.*,Hospital.Name AS [Hospital Name]  FROM Department JOIN Hospital ON Hospital.HospitalID = Department.HospitalID JOIN Admin ON Hospital.AdminID = Admin.AdminID JOIN Person ON Person.UserID=Admin.AdminID Where Hospital.HospitalID=@id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getDepartmentsEarnings(id) {
    try {
      const query = `  SELECT  Department.Name, SUM(Invoice.TotalAmount) AS Earnings,Hospital.Name As [Hospital Name],Department.Contact FROM Department JOIN DoctorDepartmentAssignment ON DoctorDepartmentAssignment.DepartmentID = Department.DepartmentID JOIN Doctor ON DoctorDepartmentAssignment.DoctorID = Doctor.DoctorID JOIN Prescription ON Prescription.DoctorID = Doctor.DoctorID JOIN Invoice ON Invoice.InvoiceID = Prescription.PrescriptionID JOIN Hospital ON Hospital.HospitalID = Department.HospitalID JOIN Admin ON Admin.AdminID = Hospital.AdminID WHERE Admin.AdminID = @id GROUP BY Department.Name,Hospital.Name,Department.Contact `;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async addDepartment(params) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `INSERT INTO Department (Name, HospitalID,Location,Contact) VALUES (@name, @hospitalID,@location,@contact)`;
      const parameters = departmentAttributes(params);
      await executeQuery(query, parameters, transaction);
      const result = await this.getAllDepartments(
        params.HospitalID,
        transaction
      );
      await transaction.commit();
      // const hospitalID=await this.findHospitalID()
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async editDepartment(params, id) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `UPDATE Department SET Name = COALESCE(@name,Name), Location = COALESCE(@location,Location), Contact = COALESCE(@contact,Contact) WHERE DepartmentID = @id`;
      const parameters = departmentAttributes(params);
      parameters.push({ name: "id", type: sql.Int, value: id });
      await executeQuery(query, parameters, transaction);
      const hospitalId = await this.findById(id, transaction);
      const result = await this.getAllDepartments(
        hospitalId?.["HospitalID"],
        transaction
      );
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async deleteHospitalFromDepartment(id, transaction) {
    let success = false;
    try {
      const query = `DELETE FROM Department WHERE HospitalID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      return (success = true);
    } catch (error) {
      return false;
    }
  },

 

  async deletePrescriptionsAndInvoices(transaction, treatmentId) {
    try {
      // Delete prescriptions associated with the treatment
      // Delete invoices associated with the prescriptions
      const queryPatientMedicines = `DELETE FROM PatientMedicine WHERE PrescriptionID IN (SELECT PrescriptionID FROM Prescription WHERE TreatmentID = @treatmentId)`;
      const parametersPrescriptions = [
        { name: "treatmentId", type: sql.Int, value: treatmentId },
      ];
      await executeQuery(
        queryPatientMedicines,
        parametersPrescriptions,
        transaction
      );
      const queryInvoices = `DELETE FROM Invoice WHERE InvoiceID IN (SELECT PrescriptionID FROM Prescription WHERE TreatmentID = @treatmentId)`;
      await executeQuery(queryInvoices, parametersPrescriptions, transaction);

      const queryPrescriptions = `DELETE FROM Prescription WHERE TreatmentID = @treatmentId`;
      await executeQuery(
        queryPrescriptions,
        parametersPrescriptions,
        transaction
      );
    } catch (error) {
      throw error;
    }
  },

  async deleteDepartment(id, adminID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      let query, parameters, result;

      // Get the treatments associated with the department
      query = `SELECT TreatmentID FROM Treatment WHERE DepartmentID = @id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      const treatments = await executeQuery(query, parameters, transaction);

      // Delete DoctorDepartmentAssignment
      query = `DELETE DoctorDepartmentAssignment WHERE DepartmentID = @id`;
      await executeQuery(query, parameters, transaction);

      // Delete prescriptions and associated invoices for each treatment
      for (const { TreatmentID } of treatments) {
        await this.deletePrescriptionsAndInvoices(
          transaction,
          TreatmentID,
          transaction
        );
      }

      // Delete treatments
      query = `DELETE FROM Treatment WHERE DepartmentID = @id`;
      await executeQuery(query, parameters, transaction);

      // Delete department
      query = `DELETE FROM Department WHERE DepartmentID = @id`;
      await executeQuery(query, parameters, transaction);

      // Commit transaction
      result = await this.getAllDepartments(adminID, transaction);
      await transaction.commit();

      // Return updated departments
      return result;
    } catch (error) {
      // Rollback transaction in case of error
      await transaction.rollback();
      return false;
    }
  },

  async getHospital(params) {
    const query = `SELECT * FROM Hospital WHERE HospitalID = @id`;
    const parameters = [{ name: "id", type: sql.Int, value: params }];
    const result = await executeQuery(query, parameters);
    return result != null && result.length > 0 ? result[0] : null;
  },
};

module.exports = Department;
