const router = require("express").Router();
const cartController = require("./cart_controller");

/* 상품 장바구니 저장  */
router.post("/addCart", cartController.addCart);

/* 상품 갯수 가져오기 */
router.get("/getCarts", cartController.getCarts);

module.exports = router;
