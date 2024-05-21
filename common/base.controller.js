const express = require('express');
class BaseController{
    _router;
    routeMiddlewares = []

    constructor() {
        this._router = express.Router();
    }
    get router(){
        return this._router;
    }
    bindRoutes(routes, prefix = '')  {
        for(let route of routes){
            // console.log(`${route.method} bind to ${prefix}${route.path}`);
            const pipeline = route.middlewares ? [...this.routeMiddlewares, ...route.middlewares, route.handler] : route.handler;
            this._router[route.method](`${prefix}${route.path}`, pipeline)
        }
    }
}
module.exports = BaseController;