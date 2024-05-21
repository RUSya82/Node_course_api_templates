const Contacts = require('../models/contacts');
class ContactsService{
    _model;
    constructor() {
        this._model = Contacts;
    }
    async getAll(){
        try{
            return await this._model.find();
        } catch (e) {
            throw new Error(e.message)
        }
    }

}
module.exports = ContactsService;