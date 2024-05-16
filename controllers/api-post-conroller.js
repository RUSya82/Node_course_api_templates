const Post = require("../models/post");
const createPath = require("../helpers/createPath");
const handleError = (res, error) => {
    res.status(500).send(error.message);
}

const getPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => res.status(200).json(post))
        .catch((error) => handleError(res, error))
};

const getPosts = (req, res) => {
    Post
        .find()
        .sort({createdAt: -1})
        .then(posts => res.status(200).json(posts))
        .catch((error) => handleError(res, error))
}
const deletePost = (req, res) => {
    const { id } = req.params;
    Post
        .findByIdAndDelete(id)
        .then((post) => {
            res.status(200).json(id);
        })
        .catch((error) => handleError(res, error));
}

const postAddPost = (req, res) => {
    const { title, author, text } = req.body;
    console.log(title, author, text)
    const post = new Post({ title, author, text });
    post
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => handleError(res, error));
}
const editPost = (req, res) => {
    const { title, author, text } = req.body;
    const { id } = req.params;
    Post
        .findByIdAndUpdate(id, {title, author, text}, { new: true })
        .then((result) => res.status(200).json(result))
        .catch((error) => handleError(res, error));
}
module.exports = {
    getPost,
    getPosts,
    deletePost,
    postAddPost,
    editPost
}