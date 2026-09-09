const mongoose = require("mongoose");
require("dotenv").config();

// mongo_blogapp is a name of docker container name
const DATABASE_URL="mongodb://mongo_blogapp:27017/blogapp-docker"
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