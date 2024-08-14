'use strict';


const express = require('express'); //loads the express framework from the index.js file in express module folder into the constant
const app = express(); //base instance of an express application, provides a server instance upon assign
const path = require('path');
const webUI = require('./webUI/app');    //looks for index.
const ftpApp = require('./ftpServer');





app.set('port', process.env.PORT2 || 3000); //Access express's built in table of key-value pairs for config
//                                           we create a port key, and set it to 3000 if not specified by process.env.PORT 
//                                           Heroku can set env.PORT

app.use(express.static('webUI/public')); //static is a middleware function provided by express. Sets up streams
app.use(express.static('volume'));

app.set('views', path.join(__dirname, './webUI/views'));

app.set('view engine', 'ejs'); //built in express property, ejs is a template language

app.use('/', webUI.router); //router middleware from our index.js in app module

webUI.ioServer(app).listen(app.get('port'), ()=>{
    console.log('Web App running on Port: ', app.get('port'));
    console.log(__dirname);
});

ftpApp.ftpServer.listen(ftpApp.options.port);


console.log('FTP server listening on port ' + ftpApp.options.port);



