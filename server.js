const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const databaseConfig = require("./app/config/db.config");
const authRoute = require("./app/routes/auth.routes");
const userRoute = require("./app/routes/user.routes");

const app = express();

databaseConfig();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// router
app.use("/auth", authRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
