const bcrypt = require("bcrypt");

const admin = require("../models/adminModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");

module.exports.registerOnRole = async (param) => {
  try {
    if (!param || typeof param !== "object") {
      throw new Error("Invalid input parameters");
    }

    const { role } = param;
    if (!role) {
      throw new Error("role is required");
    }

    switch (role) {
      case 1: // Main Admin
        return registerMainAdmin(param);
      case 2: // Main Admin
        return registerMainAdmin(param);
      case 3: // Doctor
        return registerDoctor(param);
      case 4: // Patient
        return registerPatient(param);
      // Add cases for other roles with their respective functions

      default:
        throw new Error("Invalid role");
    }
  } catch (error) {
    throw error;
  }
};

async function registerMainAdmin(param) {
  const requiredParams = [
    "Username",
    "Password",
    "FirstName",
    "LastName",
    "Email",
    "DateofBirth",
    "Gender",
  ];
  checkRequiredParams(param, requiredParams);

  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(param.Password, salt);

  return await admin.register(
    param.Username,
    securePass,
    param.FirstName,
    param.LastName,
    param.Email,
    param.DateofBirth,
    param.Gender,
    param.role
  );
}

async function registerPatient(param) {
  const requiredParams = [
    "Username",
    "Password",
    "FirstName",
    "LastName",
    "Email",
    "DateofBirth",
    "Gender",
    "role",
    "Description",
    "AliveStatus",
    "MedicalHistory",
    "HospitalID",
  ];
  checkRequiredParams(param, requiredParams);
  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(param.Password, salt);
  return await Patient.register(
    param.Username,
    securePass,
    param.FirstName,
    param.LastName,
    param.Email,
    param.Gender,
    param.DateofBirth,
    param.role,
    param?.["AliveStatus"],
    param?.["MedicalHistory"],
    param?.["HospitalID"]
  );
}
async function registerDoctor(param) {
  const requiredParams = [
    "Username",
    "Password",
    "FirstName",
    "LastName",
    "Email",
    "DateofBirth",
    "Gender",
    "role",
    "Qualification",
    "Specialization",
    "Experience",
    "Checkupstatus",
    "ConsultationFee",
    "HospitalID"
  ];
  checkRequiredParams(param, requiredParams);
  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(param.Password, salt);

  return await Doctor.register(
    param.Username,
    securePass,
    param.FirstName,
    param.LastName,
    param.Email,
    param.Gender,
    param.DateofBirth,
    param.role,
    param.Qualification,
    param.Specialization,
    param.Experience,
    param.Checkupstatus,
    param.ConsultationFee,
    param?.["HospitalID"],
  );
}

function checkRequiredParams(param, requiredParams) {
  const missingParams = requiredParams.filter((key) => !param[key]);
  if (missingParams.length > 0) {
    throw new Error(`Missing required parameters: ${missingParams.join(", ")}`);
  }
}
