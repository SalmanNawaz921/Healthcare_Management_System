const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");
const { hospitalAttributes } = require("../constants/constants");
const Appointment = require("./appointmentModel");

const Hospital = {
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
  async getAllHospital(id) {
    try {
      const query = `SELECT Hospital.HospitalID, CONCAT (Person.FirstName,' ',Person.LastName) As [Admin Name],Hospital.Name,Hospital.Email,Hospital.Contact,Hospital.City  FROM Hospital JOIN Admin ON Admin.AdminID = Hospital.AdminID  JOIN Person ON Person.UserID =Admin.AdminID`;
      const result = await executeQuery(query);
      return result;
    } catch (error) {
      throw error;
    }
  },
  async getHospitalByPatientID(id) {
    try {
      Appointment.updateDoctorStatus();
      const query = `SELECT Hospital.* FROM Hospital JOIN Patient ON Patient.HospitalID = Hospital.HospitalID WHERE Patient.PatientID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (error) {
      throw error;
    }
  },
  async getHospitalEarnings(id) {
    try {
      const query = ` SELECT (Doctor.ConsultationFee * COUNT(Appointment.AppointmentID)) AS Earnings, Appointment.AppointmentDate AS Date FROM Doctor  JOIN Appointment ON Doctor.DoctorID = Appointment.DoctorID  JOIN Hospital ON Doctor.HospitalID= Hospital.HospitalID JOIN Admin ON Hospital.AdminID= Admin.AdminID WHERE Admin.AdminID=@id GROUP BY Doctor.ConsultationFee,Appointment.AppointmentDate`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters);
      return result;
    } catch (error) {
      throw error;
    }
  },

  async addHospital(params) {
    const query = `INSERT INTO Hospital (AdminID, Name, Email, Website, Location, City, State, ZipCode, Contact) VALUES (@adminID, @name, @email, 
    @website, @location, @city, @state, @zipCode, @contact)`;
    const parameters = hospitalAttributes(params);
    await executeQuery(query, parameters);
    const result = await this.getAllHospital();
    return result;
  },

  async editHospital(params) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `UPDATE Hospital SET Name = COALESCE(@name,Name), Email = COALESCE(@email,Email), Website = COALESCE(@website,Website),
      Location = COALESCE(@location,Location), City = COALESCE(@city,City), State = COALESCE(@state,State), ZipCode = COALESCE(@zipCode,ZipCode), Contact = COALESCE(@contact,Contact) WHERE HospitalID = @id`;
      const parameters = hospitalAttributes(params);
      await executeQuery(query, parameters, transaction);
      await this.findById(params.HospitalID, transaction);
      const result = await this.getAllHospital();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async deleteHospitalFromDepartment(id) {
    let success = false;
    try {
      const query = `DELETE FROM Department WHERE HospitalID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters);
      return (success = true);
    } catch (error) {
      return false;
    }
  },
  async deleteHospital(id) {
    try {
      if (this.deleteHospitalFromDepartment(id)) {
        const query = `DELETE FROM Hospital WHERE HospitalID = @id`;
        const parameters = [{ name: "id", type: sql.Int, value: id }];
        await executeQuery(query, parameters);
        const result = await this.getAllHospital();
        return result;
      }
    } catch (error) {
      return false;
    }
  },

  async getHospital(params) {
    const query = `SELECT * FROM Hospital WHERE HospitalID = @id`;
    const parameters = [{ name: "id", type: sql.Int, value: params }];
    const result = await executeQuery(query, parameters);
    return result != null && result.length > 0 ? result[0] : null;
  },

  async getHospitalByAdminId(id) {
    const query = `SELECT * FROM Hospital WHERE AdminID = @id`;
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result;
  },

  async getHospitals() {
    const query = `SELECT * FROM Hospital`;
    const result = await executeQuery(query);
    return result;
  },
};

module.exports = Hospital;
