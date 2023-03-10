const jwt = require("jsonwebtoken");
const UserToken = require("../models/userToken.model");

const generateToken = async (user) => {
  const payload = { _id: user._id };
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
    expiresIn: "14m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: "30d",
  });

  const userToken = UserToken.findOne({ userId: user._id });
  if (userToken) await userToken.findOneAndRemove();
  await new UserToken({ userId: user._id, token: refreshToken }).save();
  return { accessToken, refreshToken };
};

module.exports = generateToken;
