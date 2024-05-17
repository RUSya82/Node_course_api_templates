const bindRoutes = (routes, application, prefix = '') => {
    for(let route of routes){
        // console.log(`${route.method} bind to ${prefix}${route.path}`);
        const pipeline = route.middlewares ? [...route.middlewares, route.handler] : route.handler;
        application[route.method](`${prefix}${route.path}`, pipeline)
    }
}
module.exports = bindRoutes;