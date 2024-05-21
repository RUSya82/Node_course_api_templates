const BaseController = require('../common/base.controller')
const express = require("express");
const {TYPES} = require("../types");

class ApiPostController extends BaseController{

    _service;
    constructor() {
        super();
        this.routeMiddlewares = [express.json()];
        this.bindRoutes(this.routes);
        this._service = this._serviceContainer.get(TYPES.PostService);
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

    async getPost (req, res) {
        try{
            const post = await this._service.getOne(req.params.id);
            res.status(200).json(post)
        } catch (error){
            this.handleError(res, error);
        }
    };

    async getPosts (req, res) {
        try{
            const posts = await this._service.getAll();
            res.status(200).json(posts)
        } catch (error){
            this.handleError(res, error);
        }
    }
    async deletePost (req, res) {
        const { id } = req.params;
        try{
            const deletedPost = await this._service.deleteOne(id);
            res.status(200).json(deletedPost)
        } catch (error){
            this.handleError(res, error);
        }
    }

    async postAddPost (req, res) {
        try{
            const result = await this._service.create(req.body);
            this._logger.log(result);
            res.status(200).json(result);
        } catch (error) {
            this.handleError(res, error)
        }
    }
    async editPost (req, res) {
        const { title, author, text } = req.body;
        const { id } = req.params;
        try {
            const result = await this._service.updateOne(id, {title, author, text});
            res.status(200).json(result)
        } catch (error){
            this.handleError(res, error)
        }
    }
}
module.exports = ApiPostController;