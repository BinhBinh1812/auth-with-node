const jwt = require("jsonwebtoken");

const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.JWT_REFRESH_KEY;

  return new Promise((resolve, reject) => {});
};

module.exports = verifyRefreshToken;
