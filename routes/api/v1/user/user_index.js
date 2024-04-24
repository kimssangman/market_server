const router = require("express").Router();
const userController = require("./user_controller");

router.get("/getUserProfile", userController.getUserProfile);

module.exports = router;
