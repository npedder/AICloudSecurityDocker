'use strict';


const express = require('express');
const app = express(); 
const path = require('path');
const webUI = require('./webUI/app'); 
const ftpApp = require('./ftpServer');




app.set('port', process.env.PORT2 || 3000); 

app.use(express.static('webUI/public')); 
app.use(express.static('volume'));

app.set('views', path.join(__dirname, './webUI/views'));

app.set('view engine', 'ejs'); 

app.use('/', webUI.router); 

webUI.ioServer(app).listen(app.get('port'), ()=>{
    console.log('Web App running on Port: ', app.get('port'));
    console.log(__dirname);
});

ftpApp.ftpServer.listen(ftpApp.options.port);


console.log('FTP server listening on port ' + ftpApp.options.port);



