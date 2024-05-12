const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const HospitalAdmin = require("../models/hospitalAdminModel");
const Doctor = require("../models/doctorModel.js");
const Patient = require("../models/patientModel");
const dotenv = require("dotenv");
dotenv.config({
  path: "../.env", // Verify the path is correct
});

const requireAuth = (userTypes) => async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "User is not authenticated!" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_KEY);
    let user;

    const types = Array.isArray(userTypes) ? userTypes : [userTypes];

    for (const userType of types) {
      switch (userType) {
        case "admin":
          user = await Admin.getByUserId(decodedToken.id);
          break;
        case "hospitalAdmin":
          user = await HospitalAdmin.findByUserId(decodedToken.id);
          break;
        case "doctor":
          user = await Doctor.findByUserId(decodedToken.id);
          break;
        case "patient":
          user = await Patient.findByUserId(decodedToken.id);
          break;
        default:
          throw new Error("Invalid user type!");
      }

      if (user) {
        req.user = user;
        return next();
      }
    }

    return res.status(401).send({ error: "User not authorized!" });
  } catch (err) {
    console.error(err);
    return res.status(401).send({ error: "Authentication failed!" });
  }
};

module.exports = requireAuth;
