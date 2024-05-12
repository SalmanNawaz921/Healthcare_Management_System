const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");
const {
  hospitalAttributes,
  departmentAttributes,
  appointmentAttributes,
} = require("../constants/constants");
const Patient = require("./patientModel");
const Doctor = require("./doctorModel");

const Appointment = {
  async findById(id, transaction = null) {
    try {
      const query = `SELECT * FROM Appointment WHERE AppointmentID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log("Error finding Appointment", err);
      throw err;
    }
  },

  async findHospitalID(id, transaction = null) {
    try {
      const query = `SELECT HospitalID FROM Hospital WHERE Hospital.AdminID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log("Error finding Department", err);
      throw err;
    }
  },

  async getAllAppointments(id, transaction = null) {
    try {
      const query = `SELECT Appointment.AppointmentID ,Doctor.DoctorID,Patient.PatientID,CONCAT(d.FirstName,' ',d.LastName) AS "Doctor",CONCAT(p.FirstName,' ',p.LastName) AS "Patient" ,Lookup.Value As Status,Appointment.AppointmentDate FROM Appointment JOIN Patient ON Patient.PatientID =Appointment.PatientID JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID  JOIN Person p ON p.UserID=Patient.PatientID  JOIN Person d ON Doctor.DoctorID= d.UserID  JOIN DoctorDepartmentAssignment ON DoctorDepartmentAssignment.DoctorID = Doctor.DoctorID  JOIN Department ON DoctorDepartmentAssignment.DepartmentID = Department.DepartmentID  JOIN Hospital ON Hospital.HospitalID = Department.HospitalID JOIN Lookup ON Lookup.Id = Appointment.AppointmentStatus JOIN Admin ON Admin.AdminID = Hospital.AdminID  Where Admin.AdminID=@id`;
      const parameters = [{ name: "Id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result;
    } catch (error) {
      console.log("Error finding Appointments", error);
      throw error;
    }
  },

  async getAllAppointmentsDoctor(id, transaction) {
    try {
      const query = `SELECT Appointment.AppointmentID,Patient.PatientID,CONCAT(p.FirstName,' ',p.LastName) AS "Patient" ,Lookup.Value As Status,Appointment.AppointmentDate FROM Appointment JOIN Patient ON Patient.PatientID =Appointment.PatientID JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID  JOIN Person p ON p.UserID=Patient.PatientID  JOIN Lookup ON Lookup.Id = Appointment.AppointmentStatus Where Doctor.DoctorID=@id`;
      const parameters = [{ name: "Id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result;
    } catch (error) {
      console.log("Error finding Appointments", error);
      throw error;
    }
  },

  async addAppointment(params, patientID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `INSERT INTO Appointment (DoctorID, PatientID, AppointmentStatus, AppointmentDate) VALUES (@doctorID, @patientID, 18, @appointmentdate)`;
      // const parameters = appointmentAttributes(params);
      const parameters = [
        { name: "doctorID", type: sql.Int, value: params.DoctorID },
        { name: "patientID", type: sql.Int, value: patientID },
        {
          name: "appointmentdate",
          type: sql.DateTime,
          value: params.AppointmentDate,
        },
      ];
      await executeQuery(query, parameters, transaction);
      const query2=`UPDATE Doctor SET CheckupStatus = 7 WHERE DoctorID = @doctorID`
      const parameters2 = [
        { name: "doctorID", type: sql.Int, value: params.DoctorID },
      ];
      await executeQuery(query2, parameters2, transaction);
      const result = await Doctor.getAllDoctorsPatient(patientID, transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      console.log("Error adding Appointment", error);
      await transaction.rollback();
      throw error;
    }
  },
  async updateDoctorStatus() {
    // Get current time
    const currentTime = new Date();

    // Calculate the time 30 minutes ago
    const thirtyMinutesAgo = new Date(currentTime.getTime() - 30 * 60000); // 30 minutes * 60 seconds * 1000 milliseconds

    // Query appointments that have ended (where AppointmentDate + 30 minutes <= current time)
    const endedAppointmentsQuery = `
        SELECT DoctorID
        FROM Appointment
        WHERE AppointmentStatus = 18
        AND DATEADD(MINUTE, 30, AppointmentDate) <= @currentTime
    `;

    //console.log("Updating doctor status...");

    // Execute the query to find ended appointments
    const endedAppointments = await executeQuery(endedAppointmentsQuery, [
      { name: "currentTime", type: sql.DateTime, value: currentTime },
    ]);

    // Update the status of doctors whose appointments have ended
    for (const appointment of endedAppointments) {
      const updateDoctorQuery = `
            UPDATE Doctor 
            SET CheckupStatus = 8
            WHERE DoctorID = @doctorID
        `;
      const updateDoctorParams = [
        { name: "doctorID", type: sql.Int, value: appointment.DoctorID },
      ];
      await executeQuery(updateDoctorQuery, updateDoctorParams);
    }
  },

  // Schedule the periodic task to run every minute
  // setInterval(updateDoctorStatus, 60000); // 60000 milliseconds = 1 minute

  async editAppointment(params, id, adminID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `UPDATE Appointment SET DoctorID = COALESCE(@doctorID,DoctorID), PatientID = COALESCE(@patientID,PatientID), AppointmentStatus =COALESCE(@appointmentStatus,AppointmentStatus), AppointmentDate = COALESCE(@appointmentdate,AppointmentDate) WHERE AppointmentID = @id`;
      const parameters = appointmentAttributes(params);
      console.log(adminID);
      parameters.push({ name: "id", type: sql.Int, value: id });
      await executeQuery(query, parameters, transaction);
      const result = await this.getAllAppointments(adminID, transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      console.log("Error editing Appointment", error);
      await transaction.rollback();
      throw error;
    }
  },

  async deleteAppointment(id, adminID) {
    try {
      const query = `DELETE FROM Appointment WHERE AppointmentID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters);
      const result = await this.getAllAppointments(adminID, transaction);
      return result;
    } catch (error) {
      console.log("Error deleting Appointment", error);
      throw error;
    }
  },
  async deleteHospitalFromDepartment(id) {
    let success = false;
    try {
      const query = `DELETE FROM Department WHERE HospitalID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters);
      console.log("reached");
      return (success = true);
    } catch (error) {
      console.log("Error deleteing hospital", error);
      return false;
    }
  },

  async deleteDepartment(id) {
    try {
      if (this.deleteHospitalFromDepartment(id)) {
        const query = `DELETE FROM Hospital WHERE HospitalID = @id`;
        const parameters = [{ name: "id", type: sql.Int, value: id }];
        await executeQuery(query, parameters);
        const result = await this.getAllHospital();
        return result;
      }
    } catch (error) {
      console.log("Error deleting hospital", error);
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

module.exports = Appointment;
