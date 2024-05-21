const express = require('express');
const apiPostRouter = require("./routers/api-post-router");
const contactRouter = require('./routers/contact-router')
const postRouter = require('./routers/post-router');
const morgan = require('morgan');
const methodOverride = require('method-override');
const createPath = require('./helpers/createPath');
const {TYPES} = require('./types');
class App{
    _app;
    _port;
    _dbService;
    _hostName;
    _configService;
    _logger;
    _prefix = '[APP]';
    _serviceContainer;
    constructor(serviceContainer) {
        this._app = express();
        this._serviceContainer = serviceContainer;
        this._configService = this._serviceContainer.get(TYPES.ConfigService);
        this._port = this._configService.get('PORT');
        this._hostName = this._configService.get('HOST');
        this._dbService = this._serviceContainer.get(TYPES.DBService);
        this._logger = this._serviceContainer.get(TYPES.LoggerService);
    }
    useMiddlewares(){
        this._app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
        this._app.use(express.urlencoded({ extended: false }));
        this._app.use(methodOverride('_method'));
        this._app.use(express.static('public'))

    }
    useRoutes(){
        this._app.use(postRouter);
        this._app.use(contactRouter);
        this._app.use('/api' , apiPostRouter);
        this._app.get('/', (req, res) => {
            const title = 'Home';
            res.render(createPath('index'), {title});
        });
        this._app.get('/about-us', (req, res) => {
            res.redirect('contacts')
        });
    }

    async init(){
        this._app.set('view-engine', 'ejs');
        this.useMiddlewares();
        this.useRoutes();
        await this._dbService.connect();
        this._app.listen(this._port, (error) => {
            if(error){
                this._logger.error(error, this._prefix)
            } else {
                this._logger.log(`Server running at http://${this._hostName}:${this._port}/`, this._prefix)
            }
        });
    }
}
module.exports = App;