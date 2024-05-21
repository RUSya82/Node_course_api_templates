const Contacts = require('../models/contacts');
class ContactsService{
    _model;
    constructor() {
        this._model = Contacts;
    }
    async getAll(){
            const contacts = await this._model.find();
            if(!contacts){
                return false;
            }
            return contacts;

    }

}
module.exports = ContactsService;