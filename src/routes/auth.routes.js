var express = require("express");
var router = express.Router();
const AuthController = require("../controllers/auth/auth.controller");
const upload = require("../services/multer.service");

const authCtrl = new AuthController.AuthController();

router.post(
  "/register",
  upload.fields([{ name: "profilePic", maxCount: 1 }]),
  async (req, res) => {
    let result = await authCtrl.register(req);
    res.status(result.status).send(result);
  }
);

router.post("/login", async (req, res) => {
  let result = await authCtrl.login(req);
  res.status(result.status).send(result);
});

module.exports = router;
