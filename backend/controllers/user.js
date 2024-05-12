const { createToken } = require("../utils/createToken");
const User = require("../models/userModel");
const express = require("express");
const route = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerOnRole } = require("../utils/registerOnRole");
const maxAge = 3 * 24 * 60 * 60;
route.use(express.json());

//For User SignUp

module.exports.signUp = async (req, res) => {
  let success = false;

  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  let result;

  const { username } = req.body;

  try {
    result = await User.userExists(username);
    // Check if user is found
    if (result) {
      res.status(402).json({ success, msg: "User Already Exists" });
    } else {
      const register = await registerOnRole(req.body);
      if (register != null) {
        success = true;
        const token = createToken(register.UserID);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ success, token, msg: "User Added" });
      }

      // result = await User.insertUser(username, securePass, role);
    }
  } catch (err) {
    res.status(400).json({ success, msg: err.message }); // Returning error message
  }
};

// For User Login
module.exports.login = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  const { Username, Password } = req.body;
  const { role } = req.params;
  try {
    // Check if user is found
    const result = await User.findUser(Username, role);
    if (result != null) {
      const auth = await User.verifyPassword(result, Password);
      if (!auth) {
        return res.status(400).send("Wrong Password!");
      }
      // console.log(result.UserID);
      const token = createToken(result.UserID);
      success = true;
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ success, token, msg: "User Found", role });
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
};
// For User Login
module.exports.edit_user = async (req, res) => {
  let success = false;
  // const errors = validationResult(req);
  const { Username, Password } = req.body;
  console.log(req.body)
  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(Password, salt);
  const { id } = req.params;
  console.log(id);
  try {
    // Check if user is found
    const result = await User.updateUser(id, Username, securePass);
    if (result !== false) {
      success = true;
      res
        .status(200)
        .json({ success, msg: "User Details Edited Successfully" });
    } else {
      res.status(404).send("Error: Updating User");
    }
  } catch (err) {
    console.log(err);
  }
};

// For Inserting 997 users

// Function to generate a random username
function generateUsername() {
  // Logic to generate a random username
  return "user" + Math.floor(Math.random() * 1000000);
}

// Function to generate a random password
function generatePassword() {
  // Logic to generate a random password
  return Math.random().toString(36).slice(-8); // Example: generates an 8-character random password
}

// const insertManyUsers = async (req, res) => {
//   let success = false;
//   try {
//     for (let i = 4; i <= 1053; i++) {
//       const salt = await bcrypt.genSalt(10);
//       const pass = generatePassword();
//       const securePass = await bcrypt.hash(pass, salt);
//       let role;
//       if (i <= 53) role = 2;
//       else if (i > 53 && i <= 553) role = 3;
//       else role = 4;
//       const result = await User.insertUser(i, `user${i}`, securePass, role);
//       if (result === false) {
//         res.status(404).send("Error: Adding Users");
//         return; // Exit the function if an error occurs
//       }
//     }
//     success = true;
//     res.status(200).json({ success, msg: "Users Added Successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Internal Server Error");
//   }
// };

const updateAdminUsersID = async (req, res) => {
  let success = false;
  let result;
  let id = 1;

  try {
    for (let i = 54; i <= 553; i++) {
      // let doctorId = Math.floor(Math.random() * 500) + 1;
      // let patientId = Math.floor(Math.random() * 10) + 1;
      // let doctorId = Math.floor(Math.random() * (554 - 53 + 1)) + 53;
      // let patientId = Math.floor(Math.random() * (1053 - 554 + 1)) + 554;
      // let appointmentSTATUS = Math.floor(Math.random() * 2) + 7;
      console.log(i);
      result = await User.updateAdminUsersID(id, i);
      id++;
      console.log(result);
    }
    if (result === false) {
      // res.status(404).send("Error: Updating Users");
      return;
    }
    success = true;
    // res.status(200).json({ success, msg: "Users Updated Successfully" });
  } catch (err) {
    console.log(err);
    // res.status(500).send("Internal Server Error");
  }
};

// updateAdminUsersID();
