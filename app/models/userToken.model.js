const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
  userId: String,
  token: String,
});

module.exports = mongoose.model("UserToken", userTokenSchema);
