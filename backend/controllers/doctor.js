const Prescription = require("../models/prescriptionModel");
const doctor = require("../models/doctorModel");
const patient = require("../models/patientModel");
const Patient = require("../models/patientModel");

const editDetails = async (req, res) => {
  let success = false;
  try {
    const { DoctorID } = req.user;
    const params = req.body;
    const doctors = await doctor.updateDoctor(DoctorID, params);
    success = true;
    res.status(200).json({ success, doctors });
  } catch (error) {
    res.status(400).json({ success, msg: error.message });
  }
};
const getDetails = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    let doctors;
    if (DoctorID) doctors = await doctor.findDoctor(DoctorID);
    else doctors = await doctor.findDoctor(req.params.id);
    if (doctors) res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const view_prescriptions_doctors = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const prescriptions = await Prescription.getAllPrescriptionsDoctor(
      DoctorID
    );
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const add_prescriptions = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const params = req.body;
    const prescriptions = await Prescription.addPrescription(params, DoctorID);
    if (prescriptions) {
      res.status(200).json(Patient.getAllPatients(DoctorID));
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const delete_prescriptions = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const { PrescriptionID } = req.params;
    const prescriptions = await Prescription.deletePrescription(
      PrescriptionID,
      DoctorID
    );
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const edit_prescriptions = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const { PrescriptionID } = req.params;
    const params = req.body;
    const prescriptions = await Prescription.editPrescription(
      params,
      PrescriptionID,
      DoctorID
    );
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const get_doctor_earnings = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const earnings = await doctor.getEarnings(DoctorID);
    res.status(200).json(earnings);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const get_patient_symptoms = async (req, res) => {
  try {
    const { id } = req.params;
    const symptoms = await patient.getPatientSymptoms(id);
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  editDetails,
  getDetails,
  view_prescriptions_doctors,
  add_prescriptions,
  edit_prescriptions,
  delete_prescriptions,
  get_patient_symptoms,
};
