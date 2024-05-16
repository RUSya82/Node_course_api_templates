const express = require('express');
const router = express.Router();
const {
    getPost,
    getEditPost,
    editPost,
    getPosts,
    deletePost,
    getAddPost,
    postAddPost
} = require("../controllers/post-controller");


router.get('/posts/:id', getPost);
router.get('/edit/:id', getEditPost);

router.put('/edit/:id', editPost);

router.get('/posts', getPosts);
router.delete('/posts/:id', deletePost);
router.get('/add-post', getAddPost);
router.post('/add-post', postAddPost);

module.exports = router;