const requireAuth = require("../../middlewares/requireAuth");
const {
  view_patients,
  view_treatments_doctor,
  view_doctor_vists,
  view_appointments_doctor,
} = require("../../controllers/fetchList");

const express = require("express");
const {
  editDetails,
  getDetails,
  view_prescriptions_doctors,
  add_prescriptions,
  edit_prescriptions,
  delete_prescriptions,
} = require("../../controllers/doctor");
const route = express.Router();
route.use(express.json());

route.get("/patientlist", requireAuth("doctor"), view_patients);
route.get("/treatmentlist", requireAuth("doctor"), view_treatments_doctor);
route.put("/editDetails", requireAuth("doctor"), editDetails);
route.get("/getDetails/:id", requireAuth(["doctor","hospitalAdmin","patient"]), getDetails);
route.get("/viewVisits", requireAuth("doctor"), view_doctor_vists);

// Prescription Routes

route.get("/prescriptions", requireAuth("doctor"), view_prescriptions_doctors);
route.post("/addPrescription", requireAuth("doctor"), add_prescriptions);
route.put("/editPrescription", requireAuth("doctor"), edit_prescriptions);
route.delete("/deltePrescription", requireAuth("doctor"), delete_prescriptions);

// Appointment Routes
route.get(
  "/getAppointmentsDoctor",
  requireAuth("doctor"),
  view_appointments_doctor
);

module.exports = route;
