const App = require('./app')

async function bootstrap(){
    const app = new App();
    try{
        await app.init();
        console.log('[MAIN] App init successfully')
    } catch (e){
        console.log('[MAIN] Error App init: ' + e.message)
    }

}
bootstrap();