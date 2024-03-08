
const clc = require("cli-color");
const mongoose = require("mongoose");

var MONGODB_URL = process.env["MONGODB_SERVER_URL_" + process.env.RUN_MODE]; //ACCESSED Object's Key Using Dynamic Keys
console.log(MONGODB_URL);

mongoose
  .connect("mongodb://127.0.0.1/mime-cart", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //don't show the log when it is test
    console.log("Connected to %s", clc.cyan.underline(MONGODB_URL));

    console.log("Press CTRL + C to stop the process. \n");
  })
  .catch((err) => {
    console.error(
      "Database Connection Error \nApp starting error:",
      err.message
    );
  });

const db = {
  // UserModel: require("./user.model"),
  categoryModel: require("./categories.model"),
  productModel: require("./products.model"),
  
}

module.exports = { db };
