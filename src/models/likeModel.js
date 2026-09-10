// step1: import mongoose
const mongoose = require("mongoose");

// step2: define schema
const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_post"
    },
    username: {
        type: String,
        required: true
    }
});

// step3: export
const like_model = mongoose.model("tbl_like", likeSchema);
module.exports = like_model;