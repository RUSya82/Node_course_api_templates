const express = require('express');
const contactRouter = express.Router();
const bindRoutes = require('../helpers/bindRoutes')
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
bindRoutes(contactsRoutes, contactRouter)

module.exports = contactRouter;