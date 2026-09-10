// step1: import mongoose
const mongoose = require("mongoose");

// step2: define schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true
    },
    postBody: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    postDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_like"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_comment"
    }],
});

// step3: export
const post_model = mongoose.model("tbl_post", postSchema);
module.exports = post_model;