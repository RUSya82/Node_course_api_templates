const express = require('express');
const ServiceContainer = require('../containers/serviceContainer');
const createPath = require("../helpers/createPath");
const {TYPES} = require("../types");
class BaseController{
    _router;
    routeMiddlewares = [];
    _serviceContainer;

    _logger;
    _prefix = '[Controller errorHandler]'

    constructor() {
        this._router = express.Router();
        this._serviceContainer = ServiceContainer.getInstance();
        this._logger = this._serviceContainer.get(TYPES.LoggerService);
    }
    get router(){
        return this._router;
    }
    bindRoutes(routes, prefix = '')  {
        for(let route of routes){
            // console.log(`${route.method} bind to ${prefix}${route.path}`);
            const func = route.handler.bind(this);
            const pipeline = route.middlewares ? [...this.routeMiddlewares, ...route.middlewares, func] : route.handler;
            this._router[route.method](`${prefix}${route.path}`, pipeline)
        }
    }
    handleError (res, error) {
        this._logger.error(error, this._prefix);
        res.render(createPath('error'), { title: 'Error' });
    }
}
module.exports = BaseController;