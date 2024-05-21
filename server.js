const App = require('./app');
const ServiceContainer = require('./containers/serviceContainer');
const DBService = require('./database/dbservice');
const ConfigService = require('./config/configService');
const LoggerService = require('./logger/loggerService');
const {TYPES} = require('./types');
const ContactController = require('./controllers/contact.controller');
const ContactsService = require('./services/contacts.service');
const PostController = require('./controllers/post.controller');
const ApiPostController = require('./controllers/apiPost.controller');
const PostService = require('./services/post.service')


const prefix = '[MAIN]';
const serviceContainer = ServiceContainer.getInstance();

serviceContainer.bind(TYPES.ConfigService, ConfigService, true);
serviceContainer.bind(TYPES.DBService, DBService, true);
serviceContainer.bind(TYPES.LoggerService, LoggerService, true);
serviceContainer.bind(TYPES.ContactController, ContactController, true);
serviceContainer.bind(TYPES.ContactsService, ContactsService, true);
serviceContainer.bind(TYPES.PostService, PostService, true);
serviceContainer.bind(TYPES.PostController, PostController, true);
serviceContainer.bind(TYPES.ApiPostController, ApiPostController);

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