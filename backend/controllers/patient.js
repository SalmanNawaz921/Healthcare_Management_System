const User = require("../models/userModel");
const Patient = require("../models/patientModel");
const Appointment = require("../models/appointmentModel");
const Invoice = require("../models/invoiceModel");

const get_details_patient = async (req, res) => {
  try {
    let details;
    const {PatientID}=req.user;
    let patientID;
    if(PatientID){
      patientID=PatientID;
    }
    else{
      const { id } = req.params;
      patientID = id;
    }
    if (patientID) {
      details = await Patient.getPatient(patientID);
      if (details) res.status(200).json(details);
    } else {
      res.status(400).json({ msg: "No Details" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
  
};

const book_appointment = async (req, res) => {
  try {
    const {PatientID}=req.user;
    const appointment = await Appointment.addAppointment(req.body,PatientID)
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(400).json({ msg: "Error Booking Appointment" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const pay_invoice = async (req, res) => {
  try {
    const {PatientID}=req.user;
    const {id}=req.params
    const invoice = await Invoice.payInvoice(id,PatientID)
    if (invoice) {
      res.status(200).json(invoice);
    } else {
      res.status(400).json({ msg: "Error Paying Invoice" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const cancel_appointment = async (req, res) => {
  try {
    const {PatientID}=req.user;
    const appointment = await Appointment.deleteAppointment(PatientID)
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(400).json({ msg: "Error Booking Appointment" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  get_details_patient,
  book_appointment,
  pay_invoice
};
