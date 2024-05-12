const requireAuth = require("../../middlewares/requireAuth");
const { editDetails } = require("../../controllers/person");
const { updatePerson } = require("../../models/personModel");
const express = require("express");
const { updateUser } = require("../../models/userModel");
const { edit_user } = require("../../controllers/user");

const route = express.Router();
route.use(express.json());
route.put("/personalDetails/:id", editDetails);
route.put("/userDetails/:id", edit_user);

module.exports = route;
