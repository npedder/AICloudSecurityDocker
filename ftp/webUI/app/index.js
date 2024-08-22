'use strict'

//create an IO Server instance
let ioServer = app => {
    
    const server = require('http').Server(app);
    return server;
}

module.exports = {  //makes this a module
    router: require('./routes')(), 
    ioServer,
}