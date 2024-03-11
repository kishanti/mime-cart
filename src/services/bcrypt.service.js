const bcrypt = require("bcrypt");

const bcryptPassword = async (payload) => {
  return await bcrypt.hash(payload, bcrypt.genSaltSync(8), null);
};

const bcryptCompare = async (password, existingPassword) => {
  return await bcrypt.compare(password, existingPassword);
};

module.exports = { bcryptPassword, bcryptCompare };
