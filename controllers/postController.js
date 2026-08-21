const post_model = require("../models/postModel");
const comment_model = require("../models/commentModel");
const like_model = require("../models/likeModel");


exports.createPostFunction = async (req, res) => {
    try {
        const {title, username, postBody} = req.body;

        const postInstance = new post_model({ title, username, postBody });

        const savedPost = await postInstance.save();

        if (!savedPost) {
            return res.status(404).json({
                success: false,
                data: savedPost,
                message: "Failed to create post"
            });
        }
        return res.status(200).json({
            success: true,
            data: savedPost,
            message: "Post created successfully"
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};
exports.getAllPostFunction = async (req, res) => {
    try {
        const postData = await post_model.find()
                        .populate("comments")
                        .populate("likes")
                        .exec();

        if (!postData) {
            return res.status(404).json({
                success: false,
                message: "No post Found"
            });
        }

        return res.status(200).json({
            success: true,
            data: postData,
            message: "post Fetched Successfuly."
        });

    }
    catch(err) {
        return res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};