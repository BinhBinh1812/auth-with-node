const User = require("../models/user.model");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUserProfile: async (req, res) => {},
  deleteUser: async () => {},
};

module.exports = userController;
