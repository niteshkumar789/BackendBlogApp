const express = require("express");
const router = express.Router();

// import controller
const { createPostFunction, getAllPostFunction } = require("../controllers/postController");
const { commentFunction } = require("../controllers/commentController");
const { likeFunction, unlikeFunction } = require("../controllers/likeController");

// map
router.post('/posts/create', createPostFunction);   // http://localhost:4000/api/v1/posts/create
router.get('/posts', getAllPostFunction);           // http://localhost:4000/api/v1/posts
router.post('/comments/create', commentFunction);   // http://localhost:4000/api/v1/comments/create
router.post('/likes/like', likeFunction);           // http://localhost:4000/api/v1/likes/like
router.post('/likes/unlike', unlikeFunction);   // http://localhost:4000/api/v1/likes/unlike

// export
module.exports = router;