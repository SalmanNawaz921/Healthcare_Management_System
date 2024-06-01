const User = require("../models/userModel");
const Person = require("../models/personModel");
const editDetails = async (req, res) => {
  let success = false;
  try {
    const params = req.body;
    const { Username } = req.body;
    const user=await User.userExists(Username);
    if (user) {
      const person= await Person.updatePerson(user?.UserID, params);
      if (person) {
        success = true;
        res.status(200).json({ success, person });
      }
    }
  } catch (error) {
    res.status(400).json({ success, msg: error.message });
  }
};

module.exports = { editDetails };
