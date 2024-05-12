const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");
const {
  treatmentAttributes,
  medicinesAttributes,
} = require("../constants/constants");

const Invoice = {
  async getAllInvoices() {
    const query = `SELECT Medicine.MedicineID, Medicine.Name, Medicine.Manufacturer,Medicine.Price,Medicine.Quantity FROM Medicine;
    `;

    const result = await executeQuery(query);
    return result;
  },

  async getAllInvoicesAdmin(id, transaction = null) {
    const query = `SELECT Invoice.InvoiceID, CONCAT(Person.FirstName,' ',Person.LastName) AS Patient, Lookup.Value As Status, Invoice.DateIssued As [Created Date]  FROM Invoice JOIN Prescription ON Prescription.PrescriptionID = Invoice.InvoiceID JOIN Doctor ON Doctor.DoctorID = Prescription.DoctorID JOIN PatientSymptoms ON PatientSymptoms.SymptomID = Prescription.SymptomID JOIN Patient ON Patient.PatientID = PatientSymptoms.PatientID JOIN Person ON Person.UserID = Patient.PatientID JOIN Hospital ON Doctor.HospitalID = Hospital.HospitalID JOIN Lookup ON Lookup.Id = Invoice.PaymentStatus JOIN Admin ON Admin.AdminID = Hospital.AdminID WHERE Admin.AdminID = @id;
    `;
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters, transaction);
    return result;
  },
  async getAllInvoicesPatient(id, transaction = null) {
    const query = `SELECT Invoice.InvoiceID, CONCAT(Person.FirstName,' ',Person.LastName) AS Doctor, Lookup.Value As Status, Invoice.DateIssued As [Created Date]  FROM Invoice JOIN Prescription ON Prescription.PrescriptionID = Invoice.InvoiceID JOIN Doctor ON Doctor.DoctorID = Prescription.DoctorID JOIN PatientSymptoms ON PatientSymptoms.SymptomID = Prescription.SymptomID JOIN Patient ON Patient.PatientID = PatientSymptoms.PatientID JOIN Person ON Person.UserID = Doctor.DoctorID JOIN Lookup ON lOOKUP.ID=Invoice.PaymentStatus WHERE Patient.PatientID = @id;
    `;
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters, transaction);
    return result;
  },
  async getAllTreatmentsByHospitalAdmin(id, transaction = null) {
    const query = `SELECT Treatment.TreatmentID,Treatment.Name,Treatment.Cost, Treatment.Duration, Department.Name AS DepartmentName,Hospital.Name AS HospitalName
    FROM Treatment
    JOIN Department ON Treatment.DepartmentID = Department.DepartmentID
    JOIN Hospital ON Hospital.HospitalID = Department.DepartmentID
    JOIN Admin ON Admin.AdminID = Hospital.AdminID
    WHERE Admin.AdminID=@id;
    `;

    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters, transaction);
    return result;
  },

  async generateInvoice(params, transaction = null) {
    try {
      const query = `INSERT INTO Invoice (InvoiceID,TotalAmount,PaymentStatus,DateIssued) VALUES (@invoiceId,@totalAmount,14,GETDATE()) `;
      const parameters = [
        { name: "invoiceId", type: sql.Int, value: params.invoiceId },
        { name: "totalAmount", type: sql.Int, value: params.totalAmount },
      ];
      await executeQuery(query, parameters, transaction);
      return true;
    } catch (error) {
      console.log("Error generating invoice", error);
      throw error;
    }
  },

  async payInvoice(id, patientID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `UPDATE Invoice SET PaymentStatus=14 WHERE InvoiceID=@invoiceId`;
      const parameters = [{ name: "invoiceId", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      const result = await this.getAllInvoicesPatient(patientID, transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      console.log("Error paying invoice", error);
      await transaction.rollback();
      throw error;
    }
  },
  async deleteInvoice(id, adminID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      let query, parameters, result;
      query = `DELETE FROM Invoice WHERE InvoiceID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      result = await this.getAllInvoicesAdmin(adminID, transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      console.log("Error deleting Invoice", error);
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = Invoice;
