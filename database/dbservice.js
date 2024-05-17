const mongoose = require('mongoose');
class DBService{
    _dbString;

    constructor() {
        this._dbString = 'mongodb+srv://asusalimrr222:102asuzf130@cluster0.pxqhgca.mongodb.net/node-blog?retryWrites=true&w=majority&appName=Cluster0'
    }
    async connect(){
        try{
            await mongoose.connect(this._dbString);
            console.log('[DBService] DB connect SUCCESSFUL')
        } catch (e){
            console.log('[DBService] db ERROR ' + e.message)
        }
    }
}
module.exports = DBService;