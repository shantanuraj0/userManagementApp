const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // this will allow to know the request types
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection');

//firing the express server
const app = express();

//added path of config.env file so that port runs on given port number in config.env file
dotenv.config({path : 'config.env'});
const PORT = process.env.PORT || 8000;


//log requests
app.use(morgan('tiny'));


//mongodb connection
connectDB();



//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine" ,"ejs");

//when we place all the files of views folder in ejs folder inside views folder , then we need to change by default view path
//app.set("views",path.resolve(__dirname,"views/ejs"));


//load the assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));



//routes
//load routers
app.use('/',require('./server/routes/router'))


app.listen(PORT ,()=>{
    console.log('server is running on port : ',PORT);
});