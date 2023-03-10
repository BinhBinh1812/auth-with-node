const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generate-token");

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body || {};
    try {
      const checkUserName = await User.findOne({ username: username });
      if (checkUserName)
        return res
          .status(400)
          .json({ message: "User with given username already exist" });
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      // create user
      const newUser = await new User({
        username: username,
        password: hashed,
      });

      //   save to db
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  logIn: async (req, res) => {
    const { username, password } = req.body || {};
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        res.status(404).json({ message: "Incorrect username" });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(404).json({ message: "Incorrect password" });
      }
      if (user && validPassword) {
        const { accessToken, refreshToken } = await generateToken(user);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({ userId: user._id, accessToken, refreshToken });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  logOut: async (req, res) => {
    res.status(200).json({ message: "Logged out successfully!" });
  },

  refreshToken: async (req, res) => {},
};

module.exports = authController;
