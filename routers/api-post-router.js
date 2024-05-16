const express = require('express');
const {getPosts,getPost,deletePost,postAddPost, editPost} = require("../controllers/api-post-conroller");
const router = express.Router();

router.get('/api/posts/:id', getPost);
router.get('/api/posts', getPosts);
router.delete('/api/posts/:id', deletePost);
router.post('/api/add-post', postAddPost);
router.put('/api/edit/:id', editPost);
module.exports = router;