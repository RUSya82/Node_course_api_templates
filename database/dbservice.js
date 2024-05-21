const mongoose = require('mongoose');
const ServiceContainer = require('../containers/serviceContainer')
const {TYPES} = require("../types");
class DBService{
    _dbUser;
    _dbPassword;
    _database;
    _configService;
    _logger;
    _prefix = '[DBService]';
    static instance = null;

    constructor() {
        this.serviceContainer = ServiceContainer.getInstance();
        this._configService = this.serviceContainer.get(TYPES.ConfigService)
        this._logger = this.serviceContainer.get(TYPES.LoggerService);
        this._dbUser = this._configService.get('DBUSER');
        this._dbPassword = this._configService.get('DBPASS');
        this._database = this._configService.get('DATABASE');
    }
    getDbString(){
        return `mongodb+srv://${this._dbUser}:${this._dbPassword}@cluster0.pxqhgca.mongodb.net/${this._database}?retryWrites=true&w=majority&appName=Cluster0`
    }
    async connect(){
        try{
            await mongoose.connect(this.getDbString());
            this._logger.log('DB connect SUCCESSFUL', this._prefix);
        } catch (e){
            this._logger.error('db ERROR ' + e.message, '[DBService] ');
        }
    }
}
module.exports = DBService;