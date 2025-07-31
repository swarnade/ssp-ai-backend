const mongoose = require("mongoose");
const ChatHistory = new mongoose.Schema({
    Input: {
        type: String,
        required: true
    },
    Output: {
        type: String,
        required: true
    },
    Model: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now,
    },

})
const ChatHistoryDB = mongoose.model("ChatHistory", ChatHistory);
module.exports = ChatHistoryDB;
