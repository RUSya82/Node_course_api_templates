const dotenv = require('dotenv');
const LoggerService = require('../logger/loggerService');
const ServiceContainer = require("../containers/serviceContainer");
const {TYPES} = require("../types");

class ConfigService{
    _result;
    _config;

    _logger;
    _prefix = '[ConfigService]';
    static instance = null;
    constructor() {
        this._result = dotenv.config();
        this.serviceContainer = ServiceContainer.getInstance();
        this._logger = this.serviceContainer.get(TYPES.LoggerService)
        if(!this._result){
            this._logger.error("Can't read file .env", this._prefix);
        } else {
            this._logger.log("Config loaded!!!", this._prefix);
        }
        this._config = this._result.parsed;

    }

    get(key){
        return this._config[key];
    }
}
module.exports = ConfigService;