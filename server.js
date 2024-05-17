const App = require('./app');
const LoggerService = require('./logger/loggerService');

const logger = LoggerService.getInstance();
const prefix = '[MAIN]';

async function bootstrap(){
    const app = new App();
    try{
        await app.init();
        logger.log('App init successfully', prefix)
    } catch (e){
        logger.error('Error App init: ' + e.message, prefix)
    }

}
bootstrap();