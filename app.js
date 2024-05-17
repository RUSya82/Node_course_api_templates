const express = require('express');
const apiPostRouter = require("./routers/api-post-router");
const contactRouter = require('./routers/contact-router')
const postRouter = require('./routers/post-router');
const morgan = require('morgan');
const methodOverride = require('method-override');
const createPath = require('./helpers/createPath');
const DBService = require('./database/dbservice');
const ConfigService = require('./config/configService');
class App{
    _app;
    _port;
    _dbUser;
    _dbPassword;

    _dbService;
    _hostName;
    _database;

    _configService;
    constructor() {
        this._app = express();
        this._configService = new ConfigService();
        this._port = this._configService.get('PORT');
        this._hostName = this._configService.get('HOST');
        this._dbUser = this._configService.get('DBUSER');
        this._dbPassword = this._configService.get('DBPASS');
        this._database = this._configService.get('DATABASE');
        this._dbService = new DBService(this._database, this._dbUser, this._dbPassword);
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
                console.log(error)
            } else {
                console.log(`Server running at http://${this._hostName}:${this._port}/`)
            }
        });
    }
}
module.exports = App;