const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const message_Schema = mongoose.Schema(
    {
        roomId: {
            type: ObjectId,
        },
        sender: {
            type: ObjectId,
        },
        receiver: {
            type: ObjectId,
        },
        content: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", message_Schema);

module.exports = Message;
