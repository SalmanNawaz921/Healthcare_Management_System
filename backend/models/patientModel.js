const { getData } = require("../db/db");
const User = require("../models/userModel");
const Person = require("../models/personModel");
const sql = require("mssql");
const { executeQuery } = require("./genericModel");

const Patient = {
  async findByUserId(id, transaction) {
    try {
      const query = "SELECT * FROM Patient WHERE PatientID = @id";
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err;
    }
  },

  async getAllPatientsByAdmin(id, transaction = null) {
    try {
      const query = `SELECT Patient.PatientID,CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name], Person.Contact, Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Lookup.Value As Gender, Appointment.AppointmentDate AS [Visit Date] FROM Patient JOIN Person ON Patient.PatientID = Person.UserID JOIN Appointment ON Appointment.PatientID = Patient.PatientID JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID JOIN PatientSymptoms ON PatientSymptoms.PatientID= Patient.PatientId  JOIN DoctorDepartmentAssignment ON Doctor.DoctorID=DoctorDepartmentAssignment.DoctorID JOIN Department ON Department.DepartmentID = DoctorDepartmentAssignment.DepartmentID JOIN Hospital ON Hospital.HospitalID = Department.HospitalID  JOIN Lookup ON Lookup.Id = Person.Gender JOIN Admin ON Admin.AdminID = Hospital.AdminID Where Admin.AdminID=@id ;
    `;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result;
    } catch (err) {
      throw err;
    }
  },

  async getAllPatientsByHospital(id) {
    try {
      const query = `SELECT Person.UserID,CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Email,l.Value As Gender,Patient.* FROM Patient JOIN Person ON Patient.PatientID = Person.UserID  JOIN Lookup l ON l.Id = Person.Gender WHERE Patient.HospitalID=@hospitalID`;
      const parameters = [{ name: "hospitalID", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async findPatientSymptomById(patientID, transaction) {
    try {
      const query =
        "SELECT * FROM Patient JOIN PatientSymptoms ON PatientSymptoms.PatientID= Patient.PatientID WHERE PatientSymptoms.SymptomID = @patientID";
      const parameters = [
        { name: "patientID", type: sql.Int, value: patientID },
      ];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (error) {
      throw error;
    }
  },
  async getAllPatients(id) {
    const query = `SELECT Appointment.AppointmentDate,FORMAT(Appointment.AppointmentDate, 'hh:mm tt') AS [AppointmentTime],DATEDIFF(HOUR,GETDATE(),Appointment.AppointmentDate) AS [HourDifference], Patient.PatientID,CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name],Person.Contact,Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Lookup.Value As Gender, s.Value AS [Status]  FROM Patient JOIN Person ON Patient.PatientID = Person.UserID JOIN Appointment ON Appointment.PatientID = Patient.PatientID JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID JOIN Lookup ON Lookup.Id = Person.Gender JOIN Lookup s on s.Id = Appointment.AppointmentStatus Where Doctor.DoctorID=@id ;
    `;
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result;
  },

  async getPatient(id, transaction = null) {
    const query =
      "SELECT Patient.PatientID,Patient.Weight,Patient.BloodPressure,Patient.Height,Patient.Allergies,Patient.AliveStatus,Patient.BloodType,Patient.MedicalHistory,Patient.HospitalID, Person.*,PatientSymptoms.SymptomName,PatientSymptoms.DateRecorded,PatientSymptoms.Description,Users.Username,PrescrIption.*,Appointment.AppointmentDate,Appointment.DoctorID FROM Patient JOIN Person ON Person.UserID= Patient.PatientID JOIN PatientSymptoms ON PatientSymptoms.PatientID = Patient.PatientID JOIN Prescription ON Prescription.SymptomID = PatientSymptoms.SymptomID JOIN Appointment ON Appointment.PatientID = Patient.PatientID  JOIN Users ON Users.UserID = Patient.PatientID WHERE Patient.PatientID =  @id";
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters, transaction);
    return result != null && result.length > 0 ? result[0] : null;
  },

  async getPatientSymptoms(id, transaction = null) {
    const query = "SELECT * FROM PatientSymptoms WHERE PatientID = @id";
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters, transaction);
    return result;
  },


  async editPatient(id, parameters) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `UPDATE Patient SET AliveStatus = COALESCE(@aliveStatus,AliveStatus), MedicalHistory = COALESCE(@medicalHistory,MedicalHistory),Weight=COALESCE(@weight,Weight), BloodPressure=COALESCE(@bloodPressure,BloodPressure),Height=COALESCE(@height,Height), Allergies=COALESCE(@allergies,Allergies), BloodType=COALESCE(@bloodType,BloodType) WHERE PatientID = @id`;
      await executeQuery(query, parameters, transaction);
      const result = await this.getPatient(id);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async getPatientByDepartment(id, transaction = null) {
    const query = `SELECT Patient.PatientID,CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name], Person.Contact, Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Lookup.Value As Gender FROM Patient Join Person ON Patient.PatientID = Person.UserID JOIN Appointment ON Appointment.PatientID = Patient.PatientID JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID JOIN DoctorDepartmentAssignment ON Doctor.DoctorID=DoctorDepartmentAssignment.DoctorID JOIN Department ON Department.DepartmentID = DoctorDepartmentAssignment.DepartmentID  JOIN Lookup ON Lookup.Id = Person.Gender WHERE Department.DepartmentID = @id`;
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters, transaction);
    return result;
  },

  async register(
    username,
    password,
    firstname,
    lastname,
    email,
    gender,
    dateofBirth,
    role,
    description,
    aliveStatus,
    medicalHistory,
    hospitalId
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
      const patient = await this.insertPatient(
        userId,
        aliveStatus,
        medicalHistory,
        hospitalId,
        transaction
      );

      const patientSymptoms = await this.insertPatientSymptoms(
        patient.PatientID,
        description,
        transaction
      );
      const personid = patient.PersonID;
      const patientid = patient.PatientID;
      const symptomsId = patientSymptoms.SymptomsID;
      const query =
        "SELECT Users.UserName, Users.UserID, Person.Email, CONCAT (Person.FirstName,' ',Person.LastName) AS Name, Patient.MedicalHistory, Patient.AliveStatus,PatientSymptoms.Description AS Symptoms FROM Patient JOIN Person ON Person.UserID = @personid JOIN Users ON Users.UserID = @userId LEFT JOIN PatientSymptoms ON PatientSymptoms.PatientID = @patientId WHERE Patient.PatientID=@patientid AND PatientSymptoms.PatientID=@patientid";
      const parameters = [
        { name: "personid", type: sql.Int, value: personid },
        { name: "userId", type: sql.Int, value: userId },
        { name: "patientId", type: sql.Int, value: patientid },
      ];
      const result = await executeQuery(query, parameters, transaction);
      await transaction.commit();
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      await transaction.rollback();
    }
  },

  async insertPatient(
    personID,
    aliveStatus,
    medicalHistory,
    hospitalId,
    transaction
  ) {
    try {
      const query =
        "INSERT INTO Patient (HospitalID,PatientID,AliveStatus,MedicalHistory) VALUES (@hospitalId,@personID,@aliveStatus,@medicalHistory)";
      const parameters = [
        { name: "hospitalId", type: sql.Int, value: hospitalId },
        { name: "personID", type: sql.Int, value: personID },
        { name: "aliveStatus", type: sql.Int, value: aliveStatus },
        { name: "medicalHistory", type: sql.VarChar, value: medicalHistory },
      ];
      await executeQuery(query, parameters, transaction);
      const result = await this.findByUserId(personID, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async insertPatientSymptoms(patientID, description, transaction) {
    try {
      const query =
        "INSERT INTO PatientSymptoms (PatientID,Description,DateRecorded) VALUES (@patientID,@description,SYSDATETIME())";
      const parameters = [
        { name: "patientID", type: sql.Int, value: patientID },
        { name: "description", type: sql.VarChar, value: description },
      ];
      await executeQuery(query, parameters, transaction);
      const result = await this.getPatientSymptoms(patientID, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async deletePatient(id, adminID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      let query, parameters, result;
      await transaction.begin();

      // Delete appointments associated with the patient
      query = `DELETE FROM Appointment WHERE PatientID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      // Get all symptom IDs associated with the patient
      query = `SELECT SymptomID FROM PatientSymptoms WHERE PatientID=@id`;
      const symptomIds = await executeQuery(query, parameters, transaction);

      // Delete prescriptions associated with each symptom of the patient
      for (const { SymptomID } of symptomIds) {
        const queryInvoices = `DELETE FROM Invoice WHERE InvoiceID IN (SELECT PrescriptionID FROM Prescription WHERE symptomId = @symptomId)`;
        parameters = [{ name: "symptomId", type: sql.Int, value: SymptomID }];
        await executeQuery(queryInvoices, parameters, transaction);
        query = `DELETE FROM Prescription WHERE SymptomID=@symptomId`;
        await executeQuery(query, parameters, transaction);
      }

      // Now delete patient symptoms associated with the patient
      query = `DELETE FROM PatientSymptoms WHERE PatientID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      query = `DELETE FROM Patient WHERE PatientID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      query = `DELETE Person WHERE UserID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      query = `DELETE Users WHERE UserID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      result = await this.getAllPatientsByAdmin(adminID, transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = Patient;
