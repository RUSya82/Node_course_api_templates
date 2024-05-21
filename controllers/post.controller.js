const BaseController = require('../common/base.controller')
const createPath = require('../helpers/createPath');
const Post = require("../models/post");
class PostController extends BaseController{
    constructor(props) {
        super(props);
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
    getPost (req, res) {
        const title = 'Post';
        Post
            .findById(req.params.id)
            .then(post => res.render(createPath('post'), {title, post}))
            .catch((error) => {
                console.log(error);
                res.render(createPath('error'), {title: 'Error'});
            })
    }
    getEditPost (req, res) {
        const title = 'Post';
        Post
            .findById(req.params.id)
            .then(post => res.render(createPath('edit-post'), { title, post }))
            .catch((error) => {
                console.log(error);
                res.render(createPath('error'), { title: 'Error' });
            })
    }
    editPost (req, res) {
        const { title, author, text } = req.body;
        const { id } = req.params;
        Post
            .findByIdAndUpdate(id, {title, author, text})
            .then((result) => res.redirect(`/posts/${id}`))
            .catch((error) => {
                console.log(error);
                res.render(createPath('error'), { title: 'Error' });
            })
    }
    getPosts (req, res) {
        const title = 'Posts';
        Post
            .find()
            .sort({createdAt: -1})
            .then(posts => res.render(createPath('posts'), { title, posts }))
            .catch((error) => {
                console.log(error);
                res.render(createPath('error'), { title: 'Error' });
            })
    }
    deletePost(req, res){
        const title = 'Posts';
        Post
            .findByIdAndDelete(req.params.id)
            .then(result => res.sendStatus(200))
            .catch((error) => {
                console.log(error);
                res.render(createPath('error'), { title: 'Error' });
            })
    }
    getAddPost (req, res) {
        const title = 'Add Post';
        res.render(createPath('add-post'), { title });
    }

    postAddPost (req, res)  {
        const { title, author, text } = req.body;
        const post = new Post({ title, author, text });
        post
            .save()
            .then((result) => {
                console.log(result)
                res.redirect('/posts')
            })
            .catch((error) => {
                console.log(error);
                res.render(createPath('error'), { title: 'Error' });
            })
    }

}
module.exports = PostController;