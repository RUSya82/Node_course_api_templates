class ServiceContainer {
    static instance = null;
    container = {};
    constructor() {
    }
    get(serviceName){
        const containerField = this.container[serviceName];
        try{
            if(containerField){
                if(!containerField.isSingletone){
                    return new containerField.target();
                } else {
                    if(containerField.instance){
                        return containerField.instance;
                    } else {
                        containerField.instance = new containerField.target();
                        return containerField.instance;
                    }
                }
            }
        } catch (e){
            console.log(e)
        }

        return this[serviceName];
    }
    bind(symbol, target, isSingletone = false){
        this.container[symbol] = {
            target,
            instance: null,
            isSingletone
        }
    }
    static getInstance(){
        if(!ServiceContainer.instance){
            ServiceContainer.instance = new ServiceContainer();
            return ServiceContainer.instance;
        } else {
            return ServiceContainer.instance;
        }
    }
}
module.exports = ServiceContainer;