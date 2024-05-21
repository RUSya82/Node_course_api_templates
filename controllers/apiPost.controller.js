const BaseController = require('../common/base.controller')
const Post = require("../models/post");
const express = require("express");

class ApiPostController extends BaseController{
    constructor() {
        super();
        this.routeMiddlewares = [express.json()];
        this.bindRoutes(this.routes);
    }
    routes = [
        {
            path: '/posts/:id',
            method: 'get',
            handler: this.getPost,
            middlewares: []
        },
        {
            path: '/posts',
            method: 'get',
            handler: this.getPosts,
            middlewares: []
        },
        {
            path: '/posts/:id',
            method: 'delete',
            handler: this.deletePost,
            middlewares: []
        },
        {
            path: '/add-post',
            method: 'post',
            handler: this.postAddPost,
            middlewares: []
        },
        {
            path: '/edit/:id',
            method: 'put',
            handler: this.editPost,
            middlewares: []
        },
    ];
    handleError (res, error) {
        res.status(500).send(error.message);
    }

    getPost (req, res) {
        Post
            .findById(req.params.id)
            .then(post => res.status(200).json(post))
            .catch((error) => this.handleError(res, error))
    };

    getPosts (req, res) {
        Post
            .find()
            .sort({createdAt: -1})
            .then(posts => res.status(200).json(posts))
            .catch((error) => this.handleError(res, error))
    }
    deletePost (req, res) {
        const { id } = req.params;
        Post
            .findByIdAndDelete(id)
            .then((post) => {
                res.status(200).json(id);
            })
            .catch((error) => this.handleError(res, error));
    }

    postAddPost (req, res) {
        const { title, author, text } = req.body;
        console.log(title, author, text)
        const post = new Post({ title, author, text });
        post
            .save()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => this.handleError(res, error));
    }
    editPost (req, res) {
        const { title, author, text } = req.body;
        const { id } = req.params;
        Post
            .findByIdAndUpdate(id, {title, author, text}, { new: true })
            .then((result) => res.status(200).json(result))
            .catch((error) => this.handleError(res, error));
    }
}
module.exports = ApiPostController;