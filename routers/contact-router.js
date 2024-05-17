const express = require('express');
const router = express.Router();
const {getContacts} = require("../controllers/contact-controller");
// const {getPost, getPosts, deletePost, postAddPost, editPost} = require("../controllers/api-post-conroller");

// router.get('/contacts', getContacts);

const routeMiddlewares = [express.json()]
const contactsRoutes = [
    {
        path: '/contacts',
        method: 'get',
        handler: getContacts,
        middlewares: [...routeMiddlewares]
    }
]

module.exports = contactsRoutes;