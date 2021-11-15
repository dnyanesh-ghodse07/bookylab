if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routers/index')

//setting up things
app.set('view engine', 'ejs')
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');

//midllewares
app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})

const db = mongoose.connection;

db.on('error',error => console.error(error));
db.once('open', () => console.log("Connected DB"))

app.use('/', indexRouter);

app.listen(process.env.port || 3000,() => {
    console.log("Server starting on port 3000");
})