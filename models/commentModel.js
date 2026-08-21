// step1: import mongoose
const mongoose = require("mongoose");

// step2: define schema
const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_post"
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true
    },
    commentDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// step3: export
const comment_model = mongoose.model("tbl_comment", commentSchema);
module.exports = comment_model;