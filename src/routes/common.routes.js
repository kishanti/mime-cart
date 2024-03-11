var express = require("express");
var router = express.Router();
const CommonController = require("../controllers/common/common.controller");
const upload = require("../services/multer.service");

const commonCtrl = new CommonController.CommonController();

router.post("/add-roles", async (req, res) => {
  let result = await commonCtrl.addRoles(req);
  res.status(result.status).send(result);
});

router.post("/create-address", async (req, res) => {
  let result = await commonCtrl.createAddress(req);
  res.status(result.status).send(result);
});

router.post("/get-address", async (req, res) => {
  let result = await commonCtrl.getAddress(req);
  res.status(result.status).send(result);
});

router.get("/get-vendor", async (req, res) => {
  let result = await commonCtrl.getVendor(req);
  res.status(result.status).send(result);
});

module.exports = router;
