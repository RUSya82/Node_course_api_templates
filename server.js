const App = require('./app');
const ServiceContainer = require('./containers/serviceContainer');
const DBService = require('./database/dbservice');
const ConfigService = require('./config/configService');
const LoggerService = require('./logger/loggerService');
const {TYPES} = require('./types');


const prefix = '[MAIN]';
const serviceContainer = ServiceContainer.getInstance();

serviceContainer.bind(TYPES.ConfigService, ConfigService, true);
serviceContainer.bind(TYPES.DBService, DBService, true);
serviceContainer.bind(TYPES.LoggerService, LoggerService, true);

const logger = serviceContainer.get(TYPES.LoggerService);

async function bootstrap(){
    const app = new App(serviceContainer);
    try{
        await app.init();
        logger.log('App init successfully', prefix)
    } catch (e){
        logger.error('Error App init: ' + e.message, prefix)
    }

}
bootstrap();