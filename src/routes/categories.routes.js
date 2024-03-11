var express = require("express");
var router = express.Router();

const CategoryController = require("../controllers/categories/categories.controller");
const { checkBearerToken, verifyAdmin } = require("../middleware");

const categoryCtrl = new CategoryController.CategoryController();

router.post("/create", checkBearerToken, verifyAdmin, async (req, res) => {
  let result = await categoryCtrl.create(req);
  res.status(result.status).send(result);
});

router.get("/get", 
// checkBearerToken,
 async (req, res) => {
  let result = await categoryCtrl.get(req);
  res.status(result.status).send(result);
});

router.delete(
  "/delete/:id",
  checkBearerToken,
  verifyAdmin,
  async (req, res) => {
    let result = await categoryCtrl.delete(req);
    res.status(result.status).send(result);
  }
);

module.exports = router;
