const log = require('npmlog');

class LoggerService{
    _logger;
    static instance;

    constructor() {
        this._logger = log;
    }

    log(message, prefix = ''){
        this._logger.info(prefix, message);
    }

    warn(message, prefix = ''){
        this._logger.warn(prefix, message);
    }
    error(message, prefix = ''){
        this._logger.error(prefix, message);
    }
    static getInstance(){
        if(!LoggerService.instance){
            LoggerService.instance = new LoggerService();
            return LoggerService.instance;
        } else {
            return LoggerService.instance;
        }
    }
}
module.exports = LoggerService;