const router = require("express").Router();
const auth = require("./auth/auth_index");
const user = require("./user/user_index");
const product = require("./product/product_index");
const cart = require("./cart/cart_index");
const chat = require("./chat/chat_index");

router.use("/auth", auth);
router.use("/user", user);
router.use("/product", product);
router.use("/cart", cart);
router.use("/chat", chat);

module.exports = router;
