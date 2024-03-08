var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/auth/auth.controller");

const authCtrl = new AuthController.AuthController();

router.post(
  "/register",
  async (req, res) => {
    let result = await authCtrl.register(req);
    res.status(result.status).send(result);
  }
);

module.exports = router;
