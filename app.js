const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = '127.0.0.1'
const port = 3000

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

const app = http.createServer((req, res) => {
    console.log('Server request ' + req.url)
    res.setHeader('Content-Type', `text/html`)

    let basePath = '';
    switch (req.url) {
        case '/':
        case '/index':
        case '/home':
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/contacts');
            res.end();
            break;
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
            break;
    }
    fs.readFile(basePath, (err, data) => {
        if(err){
            console.log(err)
            res.statusCode = 500;
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
})

app.listen(port, hostname, (error) => {
    if(error){
        console.log(error)
    } else {
        console.log(`Server running at http://${hostname}:${port}/`)
    }

})

