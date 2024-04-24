const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// 다른 모듈

mongoose.Promise = global.Promise;

const mongoApp = {};

mongoApp.appSetObjectId = function (app) {
    app.set("ObjectId", mongoose.Types.ObjectId);
    console.log("complete to set mongoose ObjectId");
};

async function main() {
    await mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            createSchema();
            console.log("Database Connected");
        });
}

main().catch((err) => console.log(err));

function createSchema() {
    const dbModels = {};

    // dbModels.coldStorageHistory = require('../models/ColdStorageHistory')
    dbModels.User = require("../models/user_schema");
    dbModels.Product = require("../models/product_schema");

    global.DB_MODELS = dbModels;
}

module.exports = mongoApp;
