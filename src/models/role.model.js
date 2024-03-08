const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleModel = Schema({
  name: {
    type: String,
  }
},{ timestamps: true });

module.exports = mongoose.model("roles", roleModel, "roles");
