const { login, signUp } = require("../../controllers/user");
const express = require("express");
const route = express.Router();
route.use(express.json());
const { body, validationResult } = require("express-validator");

// Route 1 : SignUp User

route.post(
  "/register",
  [
    body("username", "Username cannot be empty").exists(),
    body("password", "Password cannot be empty").exists(),
    body("role").exists().withMessage("Role is required"),
    body("role", "Role should be between 1-4").isInt({ min: 1, max: 4 }),
  ],
  signUp
);

// Route 2 : Login User

route.post(
  "/login/:role",
  [
    body("username", "Username cannot be empty").exists(),
    body("password", "Password cannot be empty").exists(), //exists method checks if the password is empty or not
  ],
  login
);

module.exports = route;
