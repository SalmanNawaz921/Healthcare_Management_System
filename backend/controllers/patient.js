const User = require("../models/userModel");
const Patient = require("../models/patientModel");
const Appointment = require("../models/appointmentModel");
const Invoice = require("../models/invoiceModel");

const get_details_patient = async (req, res) => {
  try {
    let details;
    const { PatientID } = req.user;
    let patientID;
    if (PatientID) {
      patientID = PatientID;
    } else {
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

const edit_details_patient = async (req, res) => {
  try {
    const { PatientID } = req.user;
    const patient = await Patient.editPatient(req.body, PatientID);
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(400).json({ msg: "Error Editing Patient" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const edit_patient_symptom = async (req, res) => {
  try {
    const { PatientID } = req.user;
    const {id}=req.params;
    const symptom = await Patient.editSymptom(req.body,id,PatientID);
    if (symptom) {
      res.status(200).json(symptom);
    } else {
      res.status(400).json({ msg: "Error Editing Symptom" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }

}

const book_appointment = async (req, res) => {
  try {
    const { PatientID } = req.user;
    console.log(req)
    const appointment = await Appointment.addAppointment(req.body, PatientID);
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
    const { PatientID } = req.user;
    const { id } = req.params;
    const invoice = await Invoice.payInvoice(id, PatientID);
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
    const { PatientID } = req.user;
    const appointment = await Appointment.deleteAppointment(PatientID);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(400).json({ msg: "Error Booking Appointment" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const add_symptom=async(req,res)=>{
  console.log(req.body) 
  try{
    const {PatientID}=req.user;
    const symptom=await Patient.insertPatientSymptoms(PatientID,req.body.Description,req.body.SymptomName,null);
    if(symptom){
      res.status(200).json(symptom);
    }else{
      res.status(400).json({msg:"Error Adding Symptom"});
    }
  }catch(error){
    res.status(400).json({msg:"Error Adding Symptom"});
  }
}

const delete_symptom=async(req,res)=>{
  try{
    const {PatientID}=req.user;
    const {id}=req.params;
    console.log(req)
    const symptom=await Patient.deletePatientSymptom(id,PatientID);
    if(symptom){
      res.status(200).json(symptom);
    }else{
      res.status(400).json({msg:"Error Deleting Symptom"});
    }
  }catch(error){
    res.status(400).json({msg:"Error Deleting Symptom"});
  }

}

module.exports = {
  get_details_patient,
  book_appointment,
  cancel_appointment,
  pay_invoice,
  edit_details_patient,
  edit_patient_symptom,
  add_symptom,
  delete_symptom
};
