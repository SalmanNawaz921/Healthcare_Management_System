const requireAuth = require("../../middlewares/requireAuth");
const express = require("express");
const { get_details_patient, book_appointment, pay_invoice, edit_details_patient, edit_patient_symptom, add_symptom } = require("../../controllers/patient");
const { view_doctors_patient, view_prescriptions_patients, view_invoices_patient, view_all_doctors_by_hospital } = require("../../controllers/fetchList");
const { get_patient_symptoms } = require("../../controllers/doctor");
const route = express.Router();
route.use(express.json());

route.get("/details/:id/:role",requireAuth(["hospitalAdmin","patient","doctor"]),get_details_patient);
route.get("/editDetails/:id",requireAuth("patient"),edit_details_patient);
route.get("/appointments",requireAuth("patient"),view_doctors_patient)
route.get("/prescriptions",requireAuth("patient"),view_prescriptions_patients)
route.get("/invoices",requireAuth("patient"),view_invoices_patient)
route.get("/doctorsByHospital/:id",requireAuth(["patient","admin"]),view_all_doctors_by_hospital)
route.post("/bookAppointment",requireAuth("patient"),book_appointment)
route.get("/getPatientSymptoms",requireAuth(["doctor","patient"]),get_patient_symptoms)
route.put("/payInvoice/:id",requireAuth("patient"),pay_invoice)
route.put("/editSymptom/:id",requireAuth("patient"),edit_patient_symptom)
route.put("/addSymptom",requireAuth("patient"),add_symptom)
module.exports = route;
