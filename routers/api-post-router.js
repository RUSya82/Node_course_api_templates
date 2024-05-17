const express = require('express');
const {getPosts,getPost,deletePost,postAddPost, editPost} = require("../controllers/api-post-conroller");
const apiPostRouter = express.Router();
const bindRoutes = require('../helpers/bindRoutes')
// const apiPostRouter = express.Router();

// apiPostRouter.use(express.json());

const routeMiddlewares = [express.json()]

const apiPostRoutes = [
    {
        path: '/posts/:id',
        method: 'get',
        handler: getPost,
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
        method: 'post',
        handler: postAddPost,
        middlewares: [...routeMiddlewares]
    },
    {
        path: '/edit/:id',
        method: 'put',
        handler: editPost,
        middlewares: [...routeMiddlewares]
    },
]

// apiPostRouter.get('/posts/:id', getPost);
// apiPostRouter.get('/posts', getPosts);
// apiPostRouter.delete('/posts/:id', deletePost);
// apiPostRouter.post('/add-post', postAddPost);
// apiPostRouter.put('/edit/:id', editPost);
bindRoutes(apiPostRoutes, apiPostRouter)
module.exports = apiPostRouter ;