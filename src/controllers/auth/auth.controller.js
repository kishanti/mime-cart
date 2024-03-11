const mongoose = require("mongoose");
const { db } = require("../../models");
const { responseModel } = require("../../responses");
const { generateToken } = require("../../services/jwt.service");
const { getRoleIdByUserType } = require("../../services/role.service");
const {
  bcryptPassword,
  bcryptCompare,
} = require("../../services/bcrypt.service");
var ObjectId = mongoose.Types.ObjectId;

class AuthController {
  constructor() {}

  register = async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        phone_code,
        mobile,
        email,
        password,
        role,
      } = req.body;
      const getRole = await getRoleIdByUserType(Number(role));
      const findRoleId = await db.RoleModel.findOne({ name: getRole.roleName });
      const profileImageName = req.files.profilePic[0].filename;
      const ifEmailExists = await db.UserModel.exists({ email: email });
      if (ifEmailExists) {
        return responseModel.badRequest("Email already exist");
      }
      const userDetails = {
        first_name: first_name,
        last_name: last_name,
        phone_code: phone_code,
        mobile: mobile,
        email: email,
        profilePic: profileImageName,
        password: await bcryptPassword(password),
      };
      const registerUser = await db.UserModel.create(userDetails);
      if (registerUser) {
        const userRoleDetails = {
          user_id: registerUser._id,
          role_id: findRoleId._id,
        };
        const createUserRole = await db.UserRoleModel.create(userRoleDetails);
        const tokenDetails = {
          _id: registerUser._id,
          email: registerUser.email,
        };
        const token = await generateToken(tokenDetails);
        return responseModel.successResponse("User register successfully", {
          registerUser,
          token: token,
        });
      }
    } catch (error) {
      return responseModel.serverError(0, "Something went wrong.", {}, error);
    }
  };

  login = async (req) => {
    try {
      const { email, password } = req.body;
      let userDetails = await db.UserModel.findOne({
        email: email && email.toLowerCase(),
      });
      if (!userDetails) {
        return responseModel.validationError(1, "Invalid Email");
      }
      userDetails = userDetails.toObject();

      const isValid = await bcryptCompare(password, userDetails.password);

      if (!isValid) {
        return responseModel.invalidToken(0, "Invalid email or password.");
      }

      const tokenData = {
        _id: userDetails._id,
        email: email,
      };
      const token = await generateToken(tokenData);
      delete userDetails.password;
      const prepareResponse = {
        ...userDetails,
        token,
      };
      return responseModel.successResponse(
        1,
        "Login successfully",
        prepareResponse
      );
    } catch (err) {
      return responseModel.serverError(0, "Something went wrong.", {});
    }
  };
}

module.exports = { AuthController };
