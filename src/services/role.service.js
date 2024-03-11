const getRoleIdByUserType = async (userType) => {
  // find roles
  let roleName;
  switch (userType) {
    case 1:
      roleName = "admin";
      break;
    case 2:
      roleName = "vendor";
      break;
    case 3:
      roleName = "user";
      break;
    default:
      break;
  }
  return { roleName };
};

module.exports = { getRoleIdByUserType };
