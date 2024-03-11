const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    phone_code: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        // unique: "User with this email already exist",
        sparse: true,
        default: ''
    },
    profilePic: { type: String, default: null },
    password: { type: String, default: null },
  
},{ timestamps: true });


module.exports = mongoose.model("users", UserModel, "users");
