const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");
const { prescriptionAttributes } = require("../constants/constants");
const Patient = require("./patientModel");
const Invoice = require("./invoiceModel");

const Prescription = {
  async findById(id, transaction = null) {
    try {
      const query = `SELECT * FROM Prescription WHERE PrescriptionID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err;
    }
  },

  async getAllPrescriptionsDoctor(id, transaction = null) {
    try {
      const query = `SELECT Prescription.PrescriptionID ,CONCAT(p.FirstName,' ',p.LastName) AS "Patient" ,
      Prescription.DateStarted AS [Date Prescribed],Lookup.Value As Condition FROM Prescription JOIN PatientSymptoms ON PatientSymptoms.SymptomID = Prescription.SymptomID JOIN Patient ON Patient.PatientID =PatientSymptoms.PatientID JOIN Doctor ON Doctor.DoctorID = Prescription.DoctorID  JOIN Person p ON p.UserID=Patient.PatientID JOIN Lookup ON Lookup.Id = Prescription.CaseType  Where Doctor.DoctorID=@id`;
      const parameters = [{ name: "Id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getAllPrescriptionsPatient(id, transaction = null) {
    try {
      const query = `SELECT Prescription.PrescriptionID ,CONCAT(p.FirstName,' ',p.LastName) AS "Doctor" ,Prescription.Diagnosis,
      Prescription.DateStarted AS [Date Prescribed],Lookup.Value As Condition FROM Prescription JOIN PatientSymptoms ON PatientSymptoms.SymptomID = Prescription.SymptomID JOIN Patient ON Patient.PatientID =PatientSymptoms.PatientID JOIN Doctor ON Doctor.DoctorID = Prescription.DoctorID JOIN Person p ON p.UserID=Doctor.DoctorID JOIN Lookup ON Lookup.Id = Prescription.CaseType  Where Patient.PatientID=@id`;
      const parameters = [{ name: "Id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getAllPrescriptions(id, transaction = null) {
    try {
      const query = `SELECT Prescription.PrescriptionID ,CONCAT(d.FirstName,' ',d.LastName) AS "Doctor",CONCAT(p.FirstName,' ',p.LastName) AS "Patient" ,Lookup.Value As Condition, Prescription.DateStarted FROM Prescription JOIN PatientSymptoms ON PatientSymptoms.SymptomID = Prescription.SymptomID JOIN Patient ON Patient.PatientID =PatientSymptoms.PatientID JOIN Doctor ON Doctor.DoctorID = Prescription.DoctorID  JOIN Person p ON p.UserID=Patient.PatientID  JOIN Person d ON Doctor.DoctorID= d.UserID  JOIN DoctorDepartmentAssignment ON DoctorDepartmentAssignment.DoctorID = Doctor.DoctorID  JOIN Department ON DoctorDepartmentAssignment.DepartmentID = Department.DepartmentID  JOIN Hospital ON Hospital.HospitalID = Department.HospitalID JOIN Lookup ON Lookup.Id = Prescription.CaseType JOIN Admin ON Admin.AdminID = Hospital.AdminID  Where Admin.AdminID=@id`;
      const parameters = [{ name: "Id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async addPrescription(params, doctorID) {
    let transaction;
    try {
      const pool = await getData();
      transaction = pool.transaction();
      let query, parameters, result;
      await transaction.begin();

      query =
        "INSERT INTO Prescription (DoctorID, SymptomID, TreatmentID, Diagnosis, CaseType, DateStarted, Advice) OUTPUT INSERTED.prescriptionid VALUES (@doctorID, @symptomID, @treatmentID, @diagnosis, @caseType, @dateStarted, @advice)";
      parameters = prescriptionAttributes(params);
      parameters.push({ name: "doctorID", type: sql.Int, value: doctorID });
      result = await executeQuery(
        query,
        parameters,
        transaction,
        "prescriptionid"
      );

      await this.addPatientMedicine(params, result, transaction);

      const patient = await Patient.findPatientSymptomById(
        params.SymptomID,
        transaction
      );
      const patientID = patient?.PatientID[0];
      query = `UPDATE Appointment SET AppointmentStatus = 19 FROM Appointment JOIN PatientSymptoms ON PatientSymptoms.SymptomID= ${params.SymptomID} WHERE PatientSymptoms.SymptomID= ${params.SymptomID}`;
      await executeQuery(query, [], transaction);
      let cost = 0;
      if (doctorID) {
        const consultationFee = await this.getConsultationFeeOfDoctor(
          doctorID,
          transaction
        );
        if (consultationFee !== null || consultationFee !== undefined)
          cost += consultationFee;
      }

      if (params.TreatmentID) {
        const treatmentCost = await this.getCostOfTreatment(
          params.TreatmentID,
          transaction
        );
        if (treatmentCost !== null || treatmentCost !== undefined)
          cost += treatmentCost;
      }

      if (params.MedicineID) {
        const medicinePrice = await this.getPriceOfMedicine(
          params.MedicineID,
          transaction
        );
        if (medicinePrice !== null || medicinePrice !== undefined)
          cost += medicinePrice;
      }

      const invoiceParams = {
        invoiceId: result,
        totalAmount: cost,
      };
      await Invoice.generateInvoice(invoiceParams, transaction);
      const allPrescriptions = await this.getAllPrescriptionsDoctor(
        doctorID,
        transaction
      );

      await transaction.commit();
      return allPrescriptions;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },

  async getCostOfTreatment(treatmentID, transaction, cost) {
    let query;
    if (treatmentID !== null && treatmentID !== undefined) {
      query = `SELECT Cost FROM Treatment WHERE TreatmentID=${treatmentID}`;
      const treatmentCostResult = await executeQuery(query, [], transaction);
      const treatmentCost = treatmentCostResult[0]?.Cost || 0;
      return treatmentCost;
    }
  },
  async getPriceOfMedicine(medicineID, transaction, cost) {
    let query;
    if (medicineID !== null && medicineID !== undefined) {
      query = `SELECT Price FROM Treatment WHERE MedicineID=${medicineID}`;
      const medicinePriceResult = await executeQuery(query, [], transaction);
      const medicinePrice = medicinePriceResult[0]?.Price || 0;
      if (medicinePrice) {
        if (params.DosageQuantity) {
          medicinePrice = medicinePrice * params.DosageQuantity;
        } else {
          medicinePrice = medicinePrice;
        }
      }
      return medicinePrice;
    }
  },

  async getConsultationFeeOfDoctor(consultationFee, transaction, cost) {
    let query;
    if (consultationFee !== null && consultationFee !== undefined) {
      query = `SELECT ConsultationFee FROM Doctor WHERE DoctorID=${consultationFee}`;
      const doctorConsultationFeeResult = await executeQuery(
        query,
        [],
        transaction
      );
      const doctorConsultationFee =
        doctorConsultationFeeResult[0]?.ConsultationFee || 0;
      return doctorConsultationFee;
    }
  },

  async addPatientMedicine(params, prescriptionID, transaction) {
    const query = `INSERT INTO PatientMedicine (MedicineID, PrescriptionID, DosageTime, DosageDuration, DosageQuantity) VALUES (@medicineID, @prescriptionID, @dosageTime, @dosageDuration, @dosageQuantity)`;
    const parameters = [
      { name: "medicineID", type: sql.Int, value: params.MedicineID },
      { name: "prescriptionID", type: sql.Int, value: prescriptionID },
      { name: "dosageTime", type: sql.VarChar, value: params.DosageTime },
      { name: "dosageDuration", type: sql.Date, value: params.DosageDuration },
      { name: "dosageQuantity", type: sql.Int, value: params.DosageQuantity },
    ];
    const result = await executeQuery(query, parameters, transaction);
    return result;
  },

  async editPrescription(params, id, doctorID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();

      const query = `UPDATE Prescription SET DoctorID = COALESCE(@doctorID,DoctorID), SymptomID = COALESCE(@symptomID,SymptomID), TreatmentID = COALESCE(@treatmentID,TreatmentID), MedicineID = COALESCE(@medicineID,MedicineID), Diagnosis = COALESCE(@diagnosis,Diagnosis), CaseType=COALESCE(@caseType,CaseType), DateStarted= COALESCE(@dateStarted,DateStarted), Advice = COALESCE(@advice,Advice) WHERE PrescriptionID = @id`;
      const parameters = prescriptionAttributes(params);
      parameters.push({ name: "id", type: sql.Int, value: id });
      await executeQuery(query, parameters, transaction);
      const result = await this.getAllPrescriptionsDoctor(
        doctorID,
        transaction
      );
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async deletePrescription(id, doctorID) {
    try {
      const query = `DELETE FROM Prescription WHERE PrescriptionID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters);
      const result = await this.getAllPrescriptionsDoctor(
        doctorID,
        transaction
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Prescription;
