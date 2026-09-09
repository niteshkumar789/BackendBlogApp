const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URL="mongodb://localhost:27017/blogapp-docker"
const connectToDB = () => {
    mongoose.connect(DATABASE_URL)
    // mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("connected to DB");
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err.message);
            process.exit(1);
        })
}

module.exports = {
  connectToDB: connectToDB
}