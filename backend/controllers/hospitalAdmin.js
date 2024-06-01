const Admin = require("../models/adminModel");
const Hospital = require("../models/hospitalModel");
const Department = require("../models/departmentModel");
const HospitalAdmin = require("../models/hospitalAdminModel");
const Treatment = require("../models/treatmentModel");
const Medicine = require("../models/medicineModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const Invoice = require("../models/invoiceModel");
const Patient = require("../models/patientModel");
const insertDepartmentDetails = async (req, res) => {
  let success = false;

  try {
    const { AdminID } = req.user;
    let hospital;
    if (AdminID) {
      hospital = await Hospital.getHospitalByAdminId(AdminID);
      let params = req.body;
      params = { ...params, HospitalID: hospital[0].HospitalID };
      const department = await Department.addDepartment(params);
      if (department) {
        success = true;
        res.status(200).json({ success, department });
      }
    }
  } catch (error) {
    res.status(400).json({ success, msg: error });
  }
};

const view_hospital = async (req, res) => {
  try {
    const { AdminID } = req.user;
    const hospital = await Hospital.getHospital(AdminID);
    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({ success, msg: error });
  }
};

const edit_department = async (req, res) => {
  let success = false;
  try {
    const params = req.body;
    const { id } = req.params;
    const department = await Department.editDepartment(params, id);
    if (department) {
      success = true;
      res.status(200).json({ success, department });
    }
  } catch (error) {
    res.status(400).json({ success, msg: error });
  }
};
const delete_department = async (req, res) => {
  try {
    //Find the note to update and delete it
    let { AdminID } = req.user;
    let hospital;
    hospital = await Hospital.getHospitalByAdminId(AdminID);
    if (hospital) {
      hospital = await Department.findById(req.params.id);
      if (!hospital) {
        return res.status(404).send({ message: "Department not found" });
      } else {
        department = await Department.deleteDepartment(
          req.params.id,
          hospital?.HospitalID
        );
        res.json({
          success: "Hospital has been removed",
          department: department,
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Error" });
  }
};

const get_details = async (req, res) => {
  try {
    const { AdminID } = req.user;

    let admin;
    if (AdminID) {
      admin = await HospitalAdmin.getHospitalAdminDetails(AdminID);
    }
    if (!admin) {
      return res.status(400).json({ msg: "No Details" }); // Return to exit function after sending response
    }
    res.status(200).json({ success: true, admin }); // Send response
  } catch (error) {
    res.status(400).json({ success: false, msg: error }); // Send error response
  }
};

const add_treatment = async (req, res) => {
  let success = false;
  try {
    const { AdminID } = req.user;
    const params = req.body;
    const treatments = await Treatment.addTreatment(params, AdminID);
    if (treatments) {
      success = true;
      res.status(200).json({ success, treatments });
    }
  } catch (error) {
    res.status(400).json({ success, msg: error });
  }
};

const edit_treatment = async (req, res) => {
  let success = false;
  try {
    const { AdminID } = req.user;

    const params = req.body;
    const { id } = req.params;
    const treatments = await Treatment.editTreatment(params, id, AdminID);
    if (treatments) {
      success = true;
      res.status(200).json({ success, treatments });
    }
  } catch (error) {
    res.status(400).json({ success, msg: error });
  }
};

const delete_treatment = async (req, res) => {
  try {
    let treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).send({ message: "Treatment not found" });
    }
    const { AdminID } = req.user;
    treatment = await Treatment.deleteTreatment(req.params.id, AdminID);
    res.json({ success: true, treatments: treatment });
  } catch (err) {
    res.status(500).json({ error: "Internal Error" });
  }
};

const add_medicine = async (req, res) => {
  let success = false;
  try {
    const params = req.body;
    const { AdminID } = req.user;
    if (AdminID) {
      const medicine = await Medicine.addMedicine(params, AdminID);
      if (medicine) {
        success = true;
        res.status(200).json({ success, medicines: medicine });
      }
    }
  } catch (error) {
    res.status(400).json({ success, msg: error });
  }
};

const edit_medicine = async (req, res) => {
  let success = false;
  try {
    const params = req.body;
    const { id } = req.params;
    const { AdminID } = req.user;
    if (AdminID) {
      const medicine = await Medicine.editMedicine(params, id);
      if (medicine) {
        success = true;
        res.status(200).json({ success, medicines: medicine });
      }
    }
  } catch (error) {
    res.status(400).json({ success, msg: error });
  }
};

const delete_medicine = async (req, res) => {
  try {
    let medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).send({ message: "Medicine not found" });
    }
    medicine = await Medicine.deleteMedicine(req.params.id);
    res.json({ SUCCESS: "Medicine has been removed", medicines: medicine });
  } catch (err) {
    res.status(500).json({ error: "Internal Error" });
  }
};

const add_appointment = async (req, res) => {
  let success = false;
  try {
    const params = req.body;
    const { AdminID } = req.user;
    if (AdminID) {
      const appointments = await Appointment.addAppointment(params, AdminID);
      if (appointments) {
        success = true;
        res.status(200).json({ success, appointments });
      }
    }
  } catch (error) {
    res.status(400).json({ success, msg: error });
  }
};

const edit_appointment = async (req, res) => {
  let success = false;
  try {
    const params = req.body;
    const { id } = req.params;
    const { AdminID } = req.user;
    if (AdminID) {
      const appointments = await Appointment.editAppointment(
        params,
        id,
        AdminID
      );
      if (appointments) {
        success = true;
        res.status(200).json({ success, appointments });
      }
    }
  } catch (error) {
    res.status(400).json({ success, msg: error });
  }
};

const delete_appointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    const admin = await HospitalAdmin.findByUserId(UserID[0]);
    if (admin) {
      appointment = await Appointment.deleteAppointment(
        req.params.id,
        admin?.AdminID
      );
      res.json({
        SUCCESS: "Appointment has been removed",
        appointments: appointment,
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Error" });
  }
};

const assign_doctor = async (req, res) => {
  try {
    const { DepartmentID, DoctorID } = req.body;
    const department = await Department.findById(DepartmentID);
    if (!department) {
      return res.status(404).send({ message: "Department not found" });
    }
    const doctor = await Doctor.assignDoctor(DoctorID, DepartmentID);
    res.json({ success: true, doctor: doctor });
  } catch (err) {
    res.status(500).json({ error: "Internal Error" });
  }
};

const get_hospital_earnings = async (req, res) => {
  try {
    let hospital;
    const { AdminID } = req.user;
    if (AdminID) {
      hospital = await Hospital.getHospitalEarnings(AdminID);
      res.status(200).json(hospital);
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error });
  }
};

const get_departments_earnings = async (req, res) => {
  try {
    const { AdminID } = req.user;
    const department = await Department.getDepartmentsEarnings(AdminID);
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const get_earnings_doctors = async (req, res) => {
  try {
    const { AdminID } = req.user;
    const doctor = await Doctor.getDoctorsEarnings(AdminID);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

// Invoice

const delete_invoice = async (req, res) => {
  try {
    let invoice;
    const { AdminID } = req.user;
    const { id } = req.params;
    if (AdminID) {
      invoice = await Invoice.deleteInvoice(id, AdminID);
      res.status(200).json(invoice);
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const delete_doctor = async (req, res) => {
  try {
    let { AdminID } = req.user;
    let doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }
    doctor = await Doctor.deleteDoctor(req.params.id, AdminID);
    res.json({ success: true, doctors: doctor });
  } catch (err) {
    res.status(500).json({ error: "Internal Error" });
  }
};

const delete_patient = async (req, res) => {
  try {
    let { AdminID } = req.user;
    let patient = await Patient.findByUserId(req.params.id);
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    } else {
      patient = await Patient.deletePatient(req.params.id, AdminID);
      res.json({ success: true, patients: patient });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Error" });
  }
};

const view_department_details = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

const view_doctors_by_department = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.getDoctorsByDepartment(id);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

const view_patients_by_department = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.getPatientByDepartment(id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

const view_treatments_by_departmment = async (req, res) => {
  try {
    const { id } = req.params;
    const treatment = await Treatment.getTreatmentsByDepartment(id);
    res.status(200).json(treatment);
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

module.exports = {
  insertDepartmentDetails,
  edit_department,
  get_details,
  add_treatment,
  edit_treatment,
  delete_treatment,
  add_medicine,
  edit_medicine,
  delete_medicine,
  add_appointment,
  edit_appointment,
  delete_appointment,
  assign_doctor,
  get_hospital_earnings,
  get_departments_earnings,
  get_earnings_doctors,
  delete_invoice,
  delete_doctor,
  delete_department,
  delete_patient,
  view_department_details,
  view_patients_by_department,
  view_doctors_by_department,
  view_treatments_by_departmment,
};
