const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/public", express.static(path.join(__dirname, "./src/public")));

app.use("/api", require("./src/routes/index"));

app.listen(port, (err, result) => {
  console.log(`Server Running On ${port}`);
});
