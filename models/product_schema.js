const mongoose = require("mongoose");

const product_Schema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", product_Schema);

module.exports = Product;
