const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const createPath = require('./helpers/createPath');
const postRouter = require("./routers/post-router")
const contactsRouter = require("./routers/contact-router");
const apiPostRouter = require("./routers/api-post-router");


const port = 3000;
const hostname = '127.0.0.1';



const dbString = 'mongodb+srv://asusalimrr222:102asuzf130@cluster0.pxqhgca.mongodb.net/node-blog?retryWrites=true&w=majority&appName=Cluster0'
mongoose
    .connect(dbString)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

const app = express();

app.set('view-engine', 'ejs');

app.listen(port, (error) => {
    if(error){
        console.log(error)
    } else {
        console.log(`Server running at http://${hostname}:${port}/`)
    }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(express.static('styles'))

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
})

app.use(postRouter);
app.use(contactsRouter);
app.use(express.json());
app.use(apiPostRouter);
app.get('/about-us', (req, res) => {
    res.redirect('contacts')
});
app.use((req, res) => {
    const title = 'Error Page';
    res.status(404).render(createPath('error'), {title})
})