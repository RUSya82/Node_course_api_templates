const BaseController = require('../common/base.controller')
const createPath = require('../helpers/createPath');
const Contacts = require('../models/contacts');
const ContactsService = require('../services/contacts.service');
const ServiceContainer = require('../containers/serviceContainer');
const {TYPES} = require("../types");

class ContactController extends BaseController {
    _contactService;
    _container = null;

    constructor() {
        super();
        this._container = ServiceContainer.getInstance();
        this._contactService = this._container.get(TYPES.ContactsService);
        this.bindRoutes(this.routes);

        // console.log(this._container)

        // console.log(this.router)
    }

    routes = [
        {
            path: '/contacts',
            method: 'get',
            handler: this.getContacts,
            middlewares: []
        }
    ];

    async getContacts(req, res) {
        // console.log(this._contactService)
        const title = 'Contacts';
        const contacts = await Contacts.find();
        // const contacts = await this._contactService.getAll();
        if(!contacts){
            res.render(createPath('error'), {title: 'Error'});
        }

        res.render(createPath('contacts'), {contacts, title});

        // this._contactService.getAll()
        //     .then(contacts => res.render(createPath('contacts'), {contacts, title}))
        //     .catch((error) => {
        //         console.log(error);
        //         res.render(createPath('error'), { title: 'Error' });
        //     })

        // Contacts
        //     .find()
        //     .then(contacts => res.render(createPath('contacts'), {contacts, title}))
        //     .catch((error) => {
        //         console.log(error);
        //         res.render(createPath('error'), { title: 'Error' });
        //     })
    }

}

module.exports = ContactController;