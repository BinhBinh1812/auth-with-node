const mongoose = require("mongoose");

const databaseConfig = () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(process.env.DATABASE_URL, options)
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

module.exports = databaseConfig;
