const dotenv = require('dotenv');
const LoggerService = require('../logger/loggerService');

class ConfigService{
    _result;
    _config;

    _logger;
    _prefix = '[ConfigService]';
    static instance = null;
    constructor() {
        this._result = dotenv.config();
        this._logger = LoggerService.getInstance();
        if(!this._result){
            this._logger.error("Can't read file .env", this._prefix);
        } else {
            this._logger.log("Config loaded!", this._prefix);
        }
        this._config = this._result.parsed;

    }
    static getInstance(){
        if(!ConfigService.instance){
            ConfigService.instance = new ConfigService();
            return ConfigService.instance
        } else {
            return  ConfigService.instance;
        }
    }

    get(key){
        return this._config[key];
    }
}
module.exports = ConfigService;