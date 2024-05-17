const dotenv = require('dotenv');

class ConfigService{
    _result;
    _config;
    constructor() {
        this._result = dotenv.config();
        if(!this._result){
            console.log("[ConfigService] Can't read file .env");
        } else {
            console.log("[ConfigService] Config loaded!");
        }
        this._config = this._result.parsed;
    }

    get(key){
        return this._config[key];
    }
}
module.exports = ConfigService;