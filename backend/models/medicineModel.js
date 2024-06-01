const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");
const {
  treatmentAttributes,
  medicinesAttributes,
} = require("../constants/constants");

const Medicine = {
  async findById(id, transaction = null) {
    try {
      const query = `SELECT * FROM Medicine WHERE MedicineID = @id`;
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      throw err;
    }
  },
  async getAllMedicines(transaction = null) {
    const query = `SELECT Medicine.MedicineID, Medicine.Name, Medicine.Manufacturer,Medicine.Price,Medicine.Quantity FROM Medicine;
    `;

    const result = await executeQuery(query, null, transaction);
    return result;
  },
  async getAllTreatmentsByHospitalAdmin(id) {
    const query = `SELECT Treatment.TreatmentID,Treatment.Name,Treatment.Cost, Treatment.Duration, Department.Name AS DepartmentName,Hospital.Name AS HospitalName
    FROM Treatment
    JOIN Department ON Treatment.DepartmentID = Department.DepartmentID
    JOIN Hospital ON Hospital.HospitalID = Department.DepartmentID
    JOIN Admin ON Admin.AdminID = Hospital.AdminID
    WHERE Admin.AdminID=@id;
    `;

    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result;
  },

  async addMedicine(params, adminID) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `INSERT INTO Medicine (Name, Manufacturer,Price, Quantity,Dosage,Description) VALUES (@name, @manufacturer,@price, @quantity,@dosage,@description) `;
      const parameters = medicinesAttributes(params);
      await executeQuery(query, parameters, transaction);
      const result = await this.getAllMedicines(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async editMedicine(params, id) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const query = `UPDATE Medicine SET Name=COALESCE(@name,Name), Manufacturer=COALESCE(@manufacturer,Manufacturer), Price=COALESCE(@price,Price), Quantity=COALESCE(@quantity,Quantity), Dosage=COALESCE(@dosage,Dosage), Description=COALESCE(@description,Description) WHERE MedicineID=@id`;
      const parameters = medicinesAttributes(params);
      parameters.push({ name: "id", type: sql.Int, value: id });
      await executeQuery(query, parameters, transaction);
      const result = await this.getAllMedicines(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async deleteMedicine(id) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      let query,parameters,result;
      query=`Update PatientMedicine SET DosageDuration=NULL , DosageQuantity=NULL,DosageTime=NULL, MedicineID=NULL WHERE MedicineID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      query = `DELETE FROM Medicine WHERE MedicineID=@id`;
      parameters = [{ name: "id", type: sql.Int, value: id }];
      await executeQuery(query, parameters, transaction);
      result = await this.getAllMedicines(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = Medicine;
