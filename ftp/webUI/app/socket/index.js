'use strict'
const h = require("../helpers");

module.exports = (io, app) =>{
    io.on('connection', (socket) => {
        console.log("connected");
        
        socket.on('rebuild', (data) =>{
            console.log("Rebuild receieved: " + data);
            h.deleteFile("/app/volume/photos.db"); // deleting the file prompts automatic rebuild
        })

    })
}