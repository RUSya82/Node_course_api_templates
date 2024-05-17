const mongoose = require('mongoose');
class DBService{
    _dbUser;
    _dbPassword;
    _database;

    constructor(database, user, password) {
        this._dbUser = user;
        this._dbPassword = password;
        this._database = database;
    }
    getDbString(){
        return `mongodb+srv://${this._dbUser}:${this._dbPassword}@cluster0.pxqhgca.mongodb.net/${this._database}?retryWrites=true&w=majority&appName=Cluster0`
    }
    async connect(){
        try{
            await mongoose.connect(this.getDbString());
            console.log('[DBService] DB connect SUCCESSFUL')
        } catch (e){
            console.log('[DBService] db ERROR ' + e.message)
        }
    }
}
module.exports = DBService;