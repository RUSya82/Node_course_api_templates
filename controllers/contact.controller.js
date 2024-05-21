const BaseController = require('../common/base.controller')
const createPath = require('../helpers/createPath');
const {TYPES} = require("../types");

class ContactController extends BaseController {
    _contactService;

    constructor() {
        super();
        this._contactService = this._serviceContainer.get(TYPES.ContactsService);
        this.bindRoutes(this.routes);
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
        const title = 'Contacts';
        try{
            const contacts = await this._contactService.getAll();
            res.render(createPath('contacts'), {contacts, title});
        } catch (error) {
            this.handleError(res, error)
        }
    }

}

module.exports = ContactController;