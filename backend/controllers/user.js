const { createToken } = require("../utils/createToken");
const User = require("../models/userModel");
const express = require("express");
const route = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
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
      const token = createToken(result.UserID);
      success = true;
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ success, token, msg: "User Found", role });
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(400).send("Login Error");
  }
};
// For User Login
module.exports.edit_user = async (req, res) => {
  let success = false;
  const { Username, Password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(Password, salt);
  const { id } = req.params;
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
  } catch (err) {}
};
