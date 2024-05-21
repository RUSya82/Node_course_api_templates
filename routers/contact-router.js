const express = require('express');
const contactRouter = express.Router();
const bindRoutes = require('../helpers/bindRoutes')
const {getContacts} = require("../controllers/contact-controller");

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