const mongoose = require('mongoose');
require('dotenv').config();

const ConnectionString = process.env.MongoDB_String;
console.log("📡 MongoDB String:", ConnectionString);

const connectDB = () => {
    if (!ConnectionString) {
        console.error("❌ MongoDB connection string not found in .env");
        return;
    }

    mongoose.connect(ConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
    });
};

module.exports = connectDB;
