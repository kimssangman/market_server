const router = require("express").Router();
const cartController = require("./cart_controller");

/* 상품 장바구니 저장  */
router.post("/addCart", cartController.addCart);

module.exports = router;
