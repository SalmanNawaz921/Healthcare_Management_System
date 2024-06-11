const sql = require("mssql");
const { getData } = require("../db/db");
const User = require("./userModel");
const Person = require("./personModel");
const { executeQuery } = require("./genericModel");
const { doctorAttributes } = require("../constants/constants");

const Doctor = {
  async findById(id, transaction) {
    const query = "SELECT * FROM Doctor WHERE DoctorID = @id";
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters, transaction);
    return result != null && result.length > 0 ? result[0] : null;
  },

  async findDoctor(id) {
    const query =
      "SELECT Users.Username, Doctor.* , Person.*, Appointment.AppointmentDate AS VisitDate FROM Doctor JOIN Appointment ON Appointment.DoctorID = Doctor.DoctorID JOIN Person ON Person.UserID = Doctor.DoctorID JOIN Users ON Users.UserID = Doctor.DoctorID WHERE Doctor.DoctorID=@doctorid";

    const parameters = [{ name: "doctorid", type: sql.Int, value: id }];

    const result = await executeQuery(query, parameters);
    return result != null && result.length > 0 ? result[0] : null;
  },

  async getVisite(id) {
    const query =
      "SELECT Appointment.AppointmentDate AS VisitDate FROM Appointment JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID WHERE Doctor.DoctorID =@doctorid";
    const parameters = [{ name: "doctorid", type: sql.Int, value: id }];

    const result = await executeQuery(query, parameters);
    return result;
  },

  async findByUserId(id) {
    const query = "SELECT * FROM Doctor Where DoctorID = @id";
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result != null && result.length > 0 ? result[0] : null;
  },
  async getAllDoctors(id) {
    const query = `SELECT Doctor.DoctorID, CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Contact,Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Lookup.Value As Gender,Doctor.Specialization, Doctor.Experience, Hospital.Name AS [Hospital Name] FROM Doctor JOIN Person ON Doctor.DoctorID = Person.UserID JOIN Hospital ON Hospital.HospitalID =Doctor.HospitalID JOIN Lookup ON Lookup.Id = Person.Gender;
    `;
    const result = await executeQuery(query);
    return result;
  },

  async getPopularDoctors(id) {
    const query = `SELECT CONCAT (P.FirstName,' ',P.LastName) AS [Name],D.Specialization,D.Experience,Dept.Name AS [Department Name],COUNT(A.DoctorID) AS TotalAppointments FROM Doctor D JOIN Person P ON D.DoctorID = P.UserID JOIN Appointment A ON A.DoctorID = D.DoctorID JOIN DoctorDepartmentAssignment DDA ON DDA.DoctorID = D.DoctorID JOIN Department Dept ON Dept.DepartmentID = DDA.DepartmentID JOIN Hospital H ON H.HospitalID = Dept.HospitalID JOIN Admin M ON M.AdminID = H.AdminID WHERE M.AdminID = @id GROUP BY D.DoctorID, P.FirstName, P.LastName,P.Email, P.DateOfBirth, D.Specialization, D.Experience,Dept.Name ORDER BY TotalAppointments DESC 
    ;
    `;
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result;
  },

  async getUnassignedDoctors(adminID) {
    const query = `SELECT D.DoctorID,CONCAT (P.FirstName,' ',P.LastName) AS [Name], P.Email,DATEDIFF(YEAR, P.DateOfBirth, GETDATE()) AS Age,D.Specialization,D.Experience FROM Doctor D JOIN Person P ON D.DoctorID = P.UserID JOIN Hospital ON Hospital.HospitalID = D.HospitalID JOIN Admin ON Admin.AdminID = Hospital.AdminID  WHERE D.DoctorID NOT IN (SELECT DoctorID FROM DoctorDepartmentAssignment) AND Admin.AdminID=@adminID`;
    const parameters = [{ name: "adminID", type: sql.Int, value: adminID }];
    const result = await executeQuery(query, parameters);
    return result;
  },
  async assignDoctor(doctorid, departmentid) {
    const query = `INSERT INTO DoctorDepartmentAssignment (DoctorID,DepartmentID,DateAssigned) VALUES (@doctorid,@departmentid,GETDATE())`;
    const parameters = [
      { name: "doctorid", type: sql.Int, value: doctorid },
      { name: "departmentid", type: sql.Int, value: departmentid },
    ];
    await executeQuery(query, parameters);
    const result = await this.getUnassignedDoctors();
    return result;
  },

  async getAllDoctorsAdmin(adminID, transaction = null) {
    const query = `  SELECT Doctor.DoctorID,CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Email,l.Value As Gender,Doctor.Specialization, Department.Name As [DepartmenName], i.Value As Status,DoctorDepartmentAssignment.DateAssigned AS [Joining Date] FROM Doctor JOIN Person ON Doctor.DoctorID = Person.UserID JOIN DoctorDepartmentAssignment ON DoctorDepartmentAssignment.DoctorID = Doctor.DoctorID JOIN Department ON Department.DepartmentID = DoctorDepartmentAssignment.DepartmentID JOIN Hospital ON Hospital.HospitalID =Department.HospitalID JOIN Lookup l ON l.Id = Person.Gender JOIN Lookup i ON i.Id= Doctor.Checkupstatus ${
      adminID
        ? "JOIN Admin ON Admin.AdminID = Hospital.AdminID Where Admin.AdminID=@id"
        : ""
    };
    `;
    const parameters = adminID
      ? [{ name: "id", type: sql.Int, value: adminID }]
      : null;
    const result = await executeQuery(query, parameters, transaction);
    return result;
  },

  async getAllDoctorsPatient(patientID, transaction = null) {
    const query = `SELECT Appointment.AppointmentID,Appointment.AppointmentDate,FORMAT(Appointment.AppointmentDate, 'hh:mm tt') AS [AppointmentTime],DATEDIFF(HOUR,GETDATE(),Appointment.AppointmentDate) AS [HourDifference],CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name],Person.Contact,Person.Email,l.Value As Gender, s.Value AS [AppointmentStatus] FROM Patient JOIN Appointment ON Appointment.PatientID = Patient.PatientID JOIN DOCTOR ON Doctor.DoctorID = Appointment.DoctorID JOIN Person ON Doctor.DoctorID = Person.UserID JOIN Hospital ON Hospital.HospitalID =Patient.HospitalID JOIN Lookup l ON l.Id = Person.Gender JOIN Lookup s on s.Id = Appointment.AppointmentStatus  Where Patient.PatientID=@patientID ;
    `;
    const parameters = [{ name: "patientID", type: sql.Int, value: patientID }];
    const result = await executeQuery(query, parameters, transaction);
    return result;
  },

  async getDoctorsEarnings(adminID) {
    try {
      const query = `  SELECT  CONCAT (D.FirstName,' ',D.LastName) As Name , SUM(Invoice.TotalAmount) AS Earnings FROM Doctor JOIN Person D ON D.UserID = Doctor.DoctorID  JOIN Prescription ON Prescription.DoctorID = Doctor.DoctorID JOIN Invoice ON Invoice.InvoiceID = Prescription.PrescriptionID JOIN Hospital ON Hospital.HospitalID = Doctor.HospitalID JOIN Admin ON Admin.AdminID = Hospital.AdminID WHERE Admin.AdminID = @adminID GROUP BY D.FirstName ,D.LastName`;
      const parameters = [{ name: "adminID", type: sql.Int, value: adminID }];
      const result = await executeQuery(query, parameters);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getAllDoctorsByHospital(hospitalID) {
    const query = ` SELECT Doctor.DoctorID,CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Email,l.Value As Gender,Doctor.Specialization, i.Value As Status FROM Doctor JOIN Person ON Doctor.DoctorID = Person.UserID  JOIN Lookup l ON l.Id = Person.Gender JOIN Lookup i ON i.Id= Doctor.Checkupstatus WHERE Doctor.HospitalID=@hospitalID ;`;
    const parameters = [
      { name: "hospitalID", type: sql.Int, value: hospitalID },
    ];
    const result = await executeQuery(query, parameters);
    return result;
  },
  async getDoctorsByDepartment(departmentID) {
    const query =
      "SELECT Doctor.DoctorID,CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Email,l.Value As Gender,Doctor.Specialization, i.Value As Status FROM Doctor JOIN Person ON Doctor.DoctorID = Person.UserID  JOIN Lookup l ON l.Id = Person.Gender JOIN Lookup i ON i.Id= Doctor.Checkupstatus  WHERE Doctor.DoctorID IN (SELECT DoctorID FROM DoctorDepartmentAssignment WHERE DepartmentID=@departmentID)";
    const parameters = [
      { name: "departmentID", type: sql.Int, value: departmentID },
    ];
    const result = await executeQuery(query, parameters);
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
    qualification,
    specialization,
    experience,
    checkupstatus,
    consulationfee,
    hospitalID
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
      let personId = person.UserID;
      const doctor = await this.insertDoctor(
        qualification,
        specialization,
        experience,
        checkupstatus,
        consulationfee,
        personId,
        hospitalID,
        transaction
      );
      let doctorId = doctor.DoctorID;
      const query =
        "SELECT Users.UserName, Users.UserID, Person.Email, CONCAT (Person.FirstName,' ',Person.LastName) AS Name, Doctor.Qualification, Doctor.Specialization, Doctor.Experience, Doctor.CheckupStatus, Doctor.ConsultationFee FROM Doctor JOIN Person ON Person.UserID = @personid JOIN Users ON Users.UserID = @userId WHERE Doctor.DoctorID=@doctorid";
      const parameters = [
        { name: "personid", type: sql.Int, value: personId },
        { name: "userId", type: sql.Int, value: userId },
        { name: "doctorid", type: sql.Int, value: doctorId },
      ];

      const result = await executeQuery(query, parameters, transaction);
      await transaction.commit();
      return result != null && result.length > 0 ? result : null;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async insertDoctor(
    qualification,
    specialization,
    experience,
    checkupstatus,
    consulationfee,
    doctorId,
    hospitalID,
    transaction
  ) {
    try {
      const query = `INSERT INTO Doctor (HospitalID,Qualification,Specialization,Experience,CheckupStatus,ConsultationFee,DoctorID) VALUES (@hospitalID,@qualification,@specialization,@experience,@checkupstatus,@consulationfee,@doctorId)`;
      const parameters = [
        { name: "qualification", type: sql.VarChar, value: qualification },
        { name: "specialization", type: sql.VarChar, value: specialization },
        { name: "experience", type: sql.Int, value: experience },
        { name: "checkupstatus", type: sql.Int, value: checkupstatus },
        { name: "consulationfee", type: sql.Decimal, value: consulationfee },
        { name: "hospitalID", type: sql.Int, value: hospitalID },
      ];
      parameters.push({ name: "doctorId", type: sql.Int, value: doctorId });
      await executeQuery(query, parameters, transaction);
      const result = await this.findById(doctorId, transaction);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateDoctor(doctorid, params) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `UPDATE Doctor SET Qualification=COALESCE(@qualification,Qualification),Specialization=COALESCE(@specialization,Specialization),Experience=COALESCE(@experience,Experience),CheckupStatus=COALESCE(@checkupstatus,CheckupStatus),ConsultationFee=COALESCE(@consulationfee,ConsultationFee) WHERE DoctorID=@doctorid`;
      const parameters = doctorAttributes(params);
      parameters.push({
        name: "doctorid",
        type: sql.Int,
        value: doctorid,
      });
      await executeQuery(query, parameters, transaction);
      const result = await this.findById(params.doctorid, transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async deleteDoctor(id, adminID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      let query, parameters, result;
      await transaction.begin();
      query = `Update Prescription SET DoctorID=NULL WHERE DoctorID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      query = `DELETE DoctorDepartmentAssignment WHERE DoctorID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      query = `DELETE Appointment WHERE DoctorID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      query = `DELETE FROM Doctor WHERE DoctorID = @id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      query = `DELETE Person WHERE UserID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      query = `DELETE Users WHERE UserID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      result = await this.getAllDoctorsAdmin(adminID, transaction);
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = Doctor;
