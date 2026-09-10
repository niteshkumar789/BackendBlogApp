const like_model = require("../models/likeModel");
const post_model = require("../models/postModel");

exports.likeFunction = async (req, res) => {
    try {
        const { postId, username } = req.body;

        const likeInstance = new like_model({postId, username});
        const savedLike = await likeInstance.save();

        // update in post
        const updatedPost = await post_model.findByIdAndUpdate(postId, {$push: {likes: savedLike._id }}, {new: true})
            .populate("likes")
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
            message: "Like added successfully"
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

exports.unlikeFunction = async (req, res) => {
    try {
        const { postId, likeId } = req.body;

        // Step 1: Check if the post exists
        const postExist = await post_model.findById(postId);
        if (!postExist) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Step 2: Check if the like exists in the like collection
        const likeExist = await like_model.findById(likeId);
        if (!likeExist) {
            return res.status(404).json({
                success: false,
                message: "Like does not exist"
            });
        }

        // Step 3: Check if that specific like belongs to that specific post
        // We compare using .toString() because MongoDB IDs are ObjectIds
        const isLikeOnPost = postExist.likes.some(like => {
            // Handles both populated objects (like._id) and unpopulated ID strings (like)
            const idToCompare = like._id ? like._id.toString() : like.toString();
            return idToCompare === likeId;
        });

        if (!isLikeOnPost) {
            return res.status(400).json({
                success: false,
                message: "This like does not belong to this post"
            });
        }

        // Step 4: Delete the like record from the likes collection
        await like_model.findByIdAndDelete(likeId);

        // Step 5: Remove the like ID from the post's likes array and return updated post
        // If your array stores objects: {$pull: {likes: {_id: likeId}}}
        // If your array stores raw IDs: {$pull: {likes: likeId}}
        // Using both in a single query covers both schemas safely:
        const updatedPost = await post_model.findByIdAndUpdate(
            postId, 
            { $pull: { likes: { _id: likeId } } }, 
            { new: true }
        ).populate("likes");

        return res.status(200).json({
            success: true,
            data: updatedPost,
            message: "Post unliked successfully"
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
