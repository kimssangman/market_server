const router = require("express").Router();
const chatController = require("./chat_controller");

router.get("/getMessage", chatController.getMessage);

module.exports = router;
