'use strict'

//create an IO Server instance
let ioServer = app => {
    
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    io.use((socket, next) => {
        require('./session')(socket.request, {}, next);
    });
    // require('./socket')(io, app);
    return server;
}

module.exports = {  //makes this a module
    router: require('./routes')(), 
    ioServer,
}