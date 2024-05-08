const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const cart_Schema = mongoose.Schema(
    {
        _id: {
            type: ObjectId,
        },
        userId: {
            type: ObjectId,
        },
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        image: {
            type: String,
        },
        count: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cart_Schema);

module.exports = Cart;
