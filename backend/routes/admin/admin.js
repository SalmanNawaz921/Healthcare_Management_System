const requireAuth = require("../../middlewares/requireAuth");
const {
  view_doctorlist,
  view_hospitals,
  view_all_hospitals,
  view_all_admins,
} = require("../../controllers/fetchList");

const express = require("express");
const {
  insertHospitalDetails,
  view_hospital,
  edit_hospital,
  delete_hospital,
  get_details,
  get_all_earnings,
  get_all_earnings_monthly,
  get_all_doctors_main_admin,
  get_all_patients_main_admin,
} = require("../../controllers/admin");
const route = express.Router();
route.use(express.json());

route.get("/doctorlist", requireAuth("admin"), view_doctorlist);
route.get("/doctorMainAdmin", requireAuth("admin"), get_all_doctors_main_admin);
route.get("/patientsMainAdmin", requireAuth("admin"), get_all_patients_main_admin);
route.get("/hospitals", requireAuth("admin"), view_hospitals);
route.get("/getHospital", requireAuth("admin"), view_hospital);
route.post("/addHospital", requireAuth("admin"), insertHospitalDetails);
route.put("/editHospital", requireAuth("admin"), edit_hospital);
route.delete("/deleteHospital/:id", requireAuth("admin"), delete_hospital);
route.get("/getDetails", requireAuth("admin"), get_details);

// View All Admins
// route.get("/viewAllAdmins", requireAuth("admin"), view_all_admins);

// Get All Hospital Earnings

route.get("/getAllEarnings", requireAuth("admin"), get_all_earnings);
route.get("/getAllEarningsMonthly", requireAuth("admin"), get_all_earnings_monthly);
route.get("/viewAllHospitals",view_all_hospitals)
route.get("/viewAllAdmins",requireAuth("admin"),view_all_admins)
route.get("/patientsMainAdmin/:id",requireAuth("admin"),get_all_patients_main_admin)
route.get("/viewHospital/:id",requireAuth("admin"),view_hospital)


module.exports = route;
