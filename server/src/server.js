const express = require("express");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const apiRoutes = require("./routes/index");
const { BASE_IP } = require("./utils/constants");

const app = express();
const port = process.env.PORT || 5000;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.static("public"));

// required middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api", apiRoutes);

app.listen(port, BASE_IP, () => console.log(`app is running on http://192.168.0.138:${port}`));
