const Doctor = require("../models/doctorModel");
const Admin = require("../models/adminModel");
const Hospital = require("../models/hospitalModel");
const Patient = require("../models/patientModel");

const insertHospitalDetails = async (req, res) => {
  try {
    const params = req.body;
    const hospital = await Hospital.addHospital(params);
    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_hospital = async (req, res) => {
  try {
    const {id}=req.params;
    const hospital = await Hospital.getHospital(id);
    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const edit_hospital = async (req, res) => {
  try {
    const params = req.body;
    const hospital = await Hospital.editHospital(params);
    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const delete_hospital = async (req, res) => {
  try {
    //Find the note to update and delete it
    let hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    hospital = await Hospital.deleteHospital(req.params.id);
    res.json({ SUCCESS: "Hospital has been removed", hospital: hospital });
  } catch (err) {
    res.status(500).json({ error: "Internal Error" });
  }
};

const get_details = async (req, res) => {
  try {
    const { UserID } = req.user;
    let details;
    if (UserID) {
      details = await Admin.getAdmin(UserID);
      res.status(200).json(details);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const get_all_earnings = async (req, res) => {
  try {
    const { UserID } = req.user;
    let details;
    if (UserID) {
      details = await Admin.getAllEarnings();
      res.status(200).json(details);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const get_all_earnings_monthly = async (req, res) => {
  try {
    const { UserID } = req.user;
    let details;
    if (UserID) {
      details = await Admin.getAllEarningsByMonth();
      res.status(200).json(details);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const get_all_doctors_main_admin = async (req, res) => {
  try {
    let doctors;
    doctors = await Doctor.getAllDoctorsAdmin(null);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};
const get_all_patients_main_admin = async (req, res) => {
  try {
    let patient;
    const { id } = req.params;
    patient = await Patient.getAllPatientsByHospital(id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ success: "false", msg: error.message });
  }
};

module.exports = {
  insertHospitalDetails,
  view_hospital,
  edit_hospital,
  delete_hospital,
  get_details,
  get_all_earnings,
  get_all_earnings_monthly,
  get_all_doctors_main_admin,
  get_all_patients_main_admin
};
