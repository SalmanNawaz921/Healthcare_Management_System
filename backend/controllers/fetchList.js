const doctor = require("../models/doctorModel");
const patient = require("../models/patientModel");
const treatment = require("../models/treatmentModel");
const hospital = require("../models/hospitalModel");
const Appointment = require("../models/appointmentModel");
const HospitalAdmin = require("../models/hospitalAdminModel");
const Department = require("../models/departmentModel");
const Hospital = require("../models/hospitalModel");
const Treatment = require("../models/treatmentModel");
const Medicine = require("../models/medicineModel");
const Invoice = require("../models/invoiceModel");
const Prescription = require("../models/prescriptionModel");

const view_doctorlist = async (req, res) => {
  try {
    const { UserID } = req.user;
    if (UserID) {
      const doctors = await doctor.getAllDoctors();
      res.status(200).json(doctors);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_patients = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const patients = await patient.getAllPatients(DoctorID);
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_treatments_doctor = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const patients = await treatment.getAllTreatments(DoctorID);
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// const view_departments = async (req, res) => {
//   try {
//     const { AdminID } = req.user;
//     const departments = await admin.getAllDepartments(AdminID);
//     res.status(200).json(departments);
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

const view_hospitals = async (req, res) => {
  try {
    const { UserID } = req.user;
    const hospitals = await hospital.getAllHospital(UserID);
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_doctor_vists = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const doctors = await doctor.getVisite(DoctorID);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_appointments = async (req, res) => {
  try {
    let appointments;
    const { AdminID } = req.user;
    if (AdminID) {
      appointments = await Appointment.getAllAppointments(AdminID);
      res.status(200).json({ success: "true", appointments });
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};
const view_departments = async (req, res) => {
  try {
    let departments;
    const { AdminID } = req.user;
    let hospital,hospitalID;
    if (AdminID) {
     hospital = await Department.findHospitalID(AdminID);
     hospitalID = hospital.HospitalID;
    }
    else{
      hospitalID = req.params.id;
    }
    if (hospitalID) {
      departments = await Department.getAllDepartments(hospitalID);
      res.status(200).json(departments);
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

const view_treatments_hospital = async (req, res) => {
  try {
    const { AdminID } = req.user;

    let treatments;
    if (AdminID) {
      const hospital = await Department.findHospitalID(AdminID);
      if (hospital) {
        treatments = await Treatment.getAllTreatmentsByHospitalAdmin(AdminID);
        res.status(200).json({ success: "true", treatments });
      }
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

const view_medicines = async (req, res) => {
  try {
    const { AdminID } = req.user;
    let medicines;
    if (AdminID) {
      const hospital = await Department.findHospitalID(AdminID);
      if (hospital) {
        medicines = await Medicine.getAllMedicines();
        res.status(200).json({ success: "true", medicines });
      }
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

const view_patients_admin = async (req, res) => {
  try {
    const { AdminID } = req.user;

    let patients;
    if (AdminID) {
      patients = await patient.getAllPatientsByAdmin(AdminID);
      // res.status(200).json({ success: "true", patients });
      res.status(200).json(patients);
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

const view_popular_doctors = async (req, res) => {
  try {
    const { AdminID } = req.user;

    let doctors;
    if (AdminID) {
      doctors = await doctor.getPopularDoctors(AdminID);
      res.status(200).json(doctors);
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

const view_unassigned_doctors = async (req, res) => {
  try {
    const { AdminID } = req.user;

    let doctors;
    if (AdminID) {
      doctors = await doctor.getUnassignedDoctors(AdminID);
      res.status(200).json(doctors);
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

const view_invoices_admin = async (req, res) => {
  try {
    const { AdminID } = req.user;
    let invoices;
    if (AdminID) {
      invoices = await Invoice.getAllInvoicesAdmin(AdminID);
      res.status(200).json(invoices);
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

const view_doctors_admin = async (req, res) => {
  try {
    const { AdminID } = req.user;
    let doctors;
    if (AdminID) {
      doctors = await doctor.getAllDoctorsAdmin(AdminID);
      res.status(200).json(doctors);
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

const view_prescriptions_admin = async (req, res) => {
  try {
    const { AdminID } = req.user;
    let prescriptions;
    if (AdminID) {
      prescriptions = await Prescription.getAllPrescriptions(AdminID);
      res.status(200).json(prescriptions);
    }
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

const view_appointments_doctor = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const appointments = await Appointment.getAllAppointmentsDoctor(DoctorID);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const view_all_hospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.getHospitals();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_doctors_patient = async (req, res) => {
  try {
    const { PatientID } = req.user;
    const doctors = await doctor.getAllDoctorsPatient(PatientID);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_prescriptions_patients = async (req, res) => {
  try {
    const { PatientID } = req.user;
    const prescriptions = await Prescription.getAllPrescriptionsPatient(
      PatientID
    );
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_invoices_patient = async (req, res) => {
  try {
    const { PatientID } = req.user;
    const invoices = await Invoice.getAllInvoicesPatient(PatientID);
    res.status(200).json(invoices);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_all_doctors_by_hospital = async (req, res) => {
  try {
    const { PatientID } = req.user;
    let hospital, doctors;
    if (PatientID) {
      hospital = await Hospital.getHospitalByPatientID(PatientID);
    } else {
      doctors = await doctor.getAllDoctorsByHospital(req.params.id);
    }
    if (hospital) {
      doctors = await doctor.getAllDoctorsByHospital(hospital?.HospitalID);
    }
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_all_admins = async (req, res) => {
  try {
    const admins = await HospitalAdmin.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  view_doctorlist,
  view_patients,
  view_treatments_doctor,
  view_hospitals,
  view_doctor_vists,
  view_appointments,
  view_departments,
  view_treatments_hospital,
  view_medicines,
  view_patients_admin,
  view_popular_doctors,
  view_unassigned_doctors,
  view_invoices_admin,
  view_doctors_admin,
  view_prescriptions_admin,
  view_appointments_doctor,
  view_all_hospitals,
  view_doctors_patient,
  view_prescriptions_patients,
  view_invoices_patient,
  view_all_doctors_by_hospital,
  view_all_admins,
};
