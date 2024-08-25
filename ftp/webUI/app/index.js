'use strict'

//create an IO Server instance
let ioServer = app => {
    
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    require('./socket')(io,app)
    return server;
}

module.exports = {  //makes this a module
    router: require('./routes')(), 
    ioServer,
}