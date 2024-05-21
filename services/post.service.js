const Post = require('../models/post')
class PostService{
    _model;
    constructor() {
        this._model = Post;
    }
    async getOne(id){
        try{
            return await this._model.findById(id)
        } catch (e) {
            throw new Error(e.message);
        }
    }
    async getAll(){
        try{
            return await this._model.find().sort({createdAt: -1});
        } catch (e) {
            throw new Error(e.message)
        }
    }
    async deleteOne(id){
        try {
            const _id = await this._model.findByIdAndDelete(id);
            return _id;
        } catch (e) {
            throw new Error(e.message)
        }
    }
    async updateOne(id, data){
        try {
            const result = await this._model.findByIdAndUpdate(id, data, { new: true });
            return result;
        } catch (e) {
            throw new Error(e.message);
        }
    }
    async create(body){
        try{
            const post = new Post(body);
            return await post.save();

        } catch (e) {
            throw new Error(e.message);
        }
    }
}
module.exports = PostService;