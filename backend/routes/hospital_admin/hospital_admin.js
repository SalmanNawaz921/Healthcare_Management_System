const requireAuth = require("../../middlewares/requireAuth");
const {
  view_doctorlist,
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
} = require("../../controllers/fetchList");

const express = require("express");

const {
  insertDepartmentDetails,
  edit_department,
  get_details,
  add_appointment,
  edit_appointment,
  delete_appointment,
  add_medicine,
  edit_medicine,
  delete_medicine,
  add_treatment,
  edit_treatment,
  delete_treatment,
  assign_doctor,
  get_hospital_earnings,
  get_departments_earnings,
  get_earnings_doctors,
  delete_invoice,
  delete_doctor,
  delete_department,
  delete_patient,
  view_department_details,
  view_doctors_by_department,
  view_treatments_by_departmment,
  view_patients_by_department,
} = require("../../controllers/hospitalAdmin");
const route = express.Router();
route.use(express.json());

route.get("/doctorlist", requireAuth("hospitalAdmin"), view_doctorlist);
route.get("/getDetails", requireAuth("hospitalAdmin"), get_details);
// Department Routes For Hospital Admin

route.post(
  "/addDepartment",
  requireAuth("hospitalAdmin"),
  insertDepartmentDetails
);
route.get("/viewDepartments", requireAuth(["hospitalAdmin","admin"]), view_departments);
route.put("/editDepartment/:id", requireAuth("hospitalAdmin"), edit_department);
route.delete("/deleteDepartment/:id", requireAuth("admin"), delete_department);
route.get("/getDepartment/:id", requireAuth("hospitalAdmin"), view_department_details);

//Appointment Routes
route.get("/viewAppointments", requireAuth("hospitalAdmin"), view_appointments);
route.post("/addAppointment", requireAuth("hospitalAdmin"), add_appointment);
route.put(
  "/editAppointment/:id",
  requireAuth("hospitalAdmin"),
  edit_appointment
);
route.delete(
  "/deleteAppointment/:id",
  requireAuth("hospitalAdmin"),
  delete_appointment
);
//Medicine Routes
route.get("/viewMedicines", requireAuth("hospitalAdmin"), view_medicines);
route.post("/addMedicine", requireAuth("hospitalAdmin"), add_medicine);
route.put("/editMedicine/:id", requireAuth("hospitalAdmin"), edit_medicine);
route.delete(
  "/deleteMedicine/:id",
  requireAuth("hospitalAdmin"),
  delete_medicine
);
//Treatment Routes
route.get(
  "/viewTreatments",
  requireAuth("hospitalAdmin"),
  view_treatments_hospital
);
route.post("/addTreatment", requireAuth("hospitalAdmin"), add_treatment);
route.put("/editTreatment/:id", requireAuth("hospitalAdmin"), edit_treatment);
route.delete(
  "/deleteTreatment/:id",
  requireAuth("hospitalAdmin"),
  delete_treatment
);

//  Patient Routes

route.get("/viewPatients", requireAuth("hospitalAdmin"), view_patients_admin);
route.delete(
  "/deletePatient/:id",
  requireAuth("hospitalAdmin"),
  delete_patient
);

//  Doctor Routes

route.get("/viewDoctors", requireAuth("hospitalAdmin"), view_doctors_admin);

route.get(
  "/viewPopularDoctors",
  requireAuth("hospitalAdmin"),
  view_popular_doctors
);
route.get(
  "/viewUnassignedDoctors",
  requireAuth("hospitalAdmin"),
  view_unassigned_doctors
);
route.post("/assignDoctor", requireAuth("hospitalAdmin"), assign_doctor);
route.get(
  "/viewDoctorsEarnings",
  requireAuth("hospitalAdmin"),
  get_earnings_doctors
);

route.delete("/deleteDoctor/:id", requireAuth("hospitalAdmin"), delete_doctor);
// Hospital Routes

route.get(
  "/viewHospitalEarnings",
  requireAuth("hospitalAdmin"),
  get_hospital_earnings
);

// Invoice Route

route.get("/viewInvoices", requireAuth("hospitalAdmin"), view_invoices_admin);
route.delete(
  "/deleteInvoice/:id",
  requireAuth("hospitalAdmin"),
  delete_invoice
);

// Prescription Route

route.get(
  "/viewPrescriptions",
  requireAuth("hospitalAdmin"),
  view_prescriptions_admin
);

// Department Wise Earnings

route.get(
  "/viewDepartmentEarnings",
  requireAuth("hospitalAdmin"),
  get_departments_earnings
);


// Details Routes

route.get("/getDoctorsByDepartment/:id", requireAuth("hospitalAdmin"), view_doctors_by_department);
route.get("/getTreatmentsByDepartment/:id", requireAuth("hospitalAdmin"), view_treatments_by_departmment);
route.get("/getPatientsByDepartment/:id", requireAuth("hospitalAdmin"), view_patients_by_department);


module.exports = route;
