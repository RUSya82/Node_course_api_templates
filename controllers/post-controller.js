const Post = require("../models/post");
const createPath = require('../helpers/createPath')


const getPost = (req, res) => {
    const title = 'Post';
    Post
        .findById(req.params.id)
        .then(post => res.render(createPath('post'), {title, post}))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), {title: 'Error'});
        })
}
const getEditPost = (req, res) => {
    const title = 'Post';
    Post
        .findById(req.params.id)
        .then(post => res.render(createPath('edit-post'), { title, post }))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' });
        })
}
const editPost = (req, res) => {
    const { title, author, text } = req.body;
    const { id } = req.params;
    Post
        .findByIdAndUpdate(id, {title, author, text})
        .then((result) => res.redirect(`/posts/${id}`))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' });
        })
}
const getPosts = (req, res) => {
    const title = 'Posts';
    Post
        .find()
        .sort({createdAt: -1})
        .then(posts => res.render(createPath('posts'), { title, posts }))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' });
        })
}
const deletePost = (req, res) => {
    const title = 'Posts';
    Post
        .findByIdAndDelete(req.params.id)
        .then(result => res.sendStatus(200))
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' });
        })
}
const getAddPost = (req, res) => {
    const title = 'Add Post';
    res.render(createPath('add-post'), { title });
}

const postAddPost = (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text });
    post
        .save()
        .then((result) => {
            console.log(result)
            res.redirect('/posts')
        })
        .catch((error) => {
            console.log(error);
            res.render(createPath('error'), { title: 'Error' });
        })
}
module.exports = {
    getPost,
    getEditPost,
    editPost,
    getPosts,
    deletePost,
    getAddPost,
    postAddPost
}