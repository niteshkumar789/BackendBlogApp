const comment_model = require("../models/commentModel");
const post_model = require("../models/postModel");

exports.commentFunction = async (req, res) => {
    try {
        const {postId, description, username} = req.body;

        // 1. Create an instance of the model using 'new'
        const commentInstance = new comment_model({
            postId, 
            description,
            username
        });

        // 2. Call .save() on that specific instance
        const savedComment = await commentInstance.save();

        const updatedPost = await post_model.findByIdAndUpdate(
                postId, // 1st argument: the ID string
                { $push: { comments: savedComment._id } }, // 2nd argument: update operation
                { new: true } // 3rd argument: options
            )
            .populate("comments")
            .exec();

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

         return res.status(200).json({
            success: true,
            data: updatedPost,
            message: "Comment added successfully"
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