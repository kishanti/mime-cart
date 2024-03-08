const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRoleModel = Schema({
    roleId: {
        type: Schema.Types.ObjectId,
        ref: "roles",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("user_roles", userRoleModel, "user_roles");
