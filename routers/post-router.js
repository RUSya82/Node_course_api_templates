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

const routeMiddlewares = []

const postRoutes = [
    {
        path: '/posts/:id',
        method: 'get',
        handler: getPost,
        middlewares: [...routeMiddlewares]
    },
    {
        path: '/edit/:id',
        method: 'get',
        handler: getEditPost,
        middlewares: [...routeMiddlewares]
    },
    {
        path: '/edit/:id',
        method: 'put',
        handler: editPost,
        middlewares: [...routeMiddlewares]
    },
    {
        path: '/posts',
        method: 'get',
        handler: getPosts,
        middlewares: [...routeMiddlewares]
    },
    {
        path: '/posts/:id',
        method: 'delete',
        handler: deletePost,
        middlewares: [...routeMiddlewares]
    },
    {
        path: '/add-post',
        method: 'get',
        handler: getAddPost,
        middlewares: [...routeMiddlewares]
    },
    {
        path: '/add-post',
        method: 'post',
        handler: postAddPost,
        middlewares: [...routeMiddlewares]
    },
]

module.exports = postRoutes;