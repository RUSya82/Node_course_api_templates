const BaseController = require('../common/base.controller')
const createPath = require('../helpers/createPath');
const {TYPES} = require("../types");

class PostController extends BaseController {
    _service;

    constructor(props) {
        super(props);
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
            path: '/edit/:id',
            method: 'get',
            handler: this.getEditPost,
            middlewares: []
        },
        {
            path: '/edit/:id',
            method: 'put',
            handler: this.editPost,
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
            method: 'get',
            handler: this.getAddPost,
            middlewares: []
        },
        {
            path: '/add-post',
            method: 'post',
            handler: this.postAddPost,
            middlewares: []
        },
    ];

    async getPost(req, res) {
        const title = 'Post';
        try {
            const post = await this._service.getOne(req.params.id);
            res.render(createPath('post'), {title, post});
        } catch (error) {
            this.handleError(res, error)
        }
    }

    async getEditPost(req, res) {
        const title = 'Post';
        try {
            const post = await this._service.getOne(req.params.id);
            res.render(createPath('edit-post'), {title, post});
        } catch (error) {
            this.handleError(res, error)
        }
    }

    async editPost(req, res) {
        const {title, author, text} = req.body;
        const {id} = req.params;
        try {
            await this._service.updateOne(id, {title, author, text});
            res.redirect(`/posts/${id}`)
        } catch (error){
            this.handleError(res, error)
        }
    }

    async getPosts(req, res) {
        const title = 'Posts';
        try{
            const posts = await this._service.getAll();
            res.render(createPath('posts'), {title, posts})
        } catch (error) {
            this.handleError(res, error)
        }
    }

    async deletePost(req, res) {
        const title = 'Posts';
        try{
            const id = await this._service.deleteOne(req.params.id);
            res.sendStatus(200)
        } catch (error) {
            this.handleError(res, error)
        }
    }

    getAddPost(req, res) {
        const title = 'Add Post';
        res.render(createPath('add-post'), {title});
    }

    async postAddPost(req, res) {
        try{
            const newPost = await this._service.create(req.body);
            this._logger.log(newPost);
            res.redirect('/posts')
        } catch (error) {
            this.handleError(res, error)
        }
    }

}

module.exports = PostController;