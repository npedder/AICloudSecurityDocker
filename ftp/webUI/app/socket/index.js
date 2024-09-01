'use strict'
const h = require("../helpers");
const db = require("../database");

module.exports = (io, app) =>{
    io.on('connection', (socket) => {
        console.log("connected");
        
        socket.on('rebuild', (data) =>{
            console.log("Rebuild receieved: " + data);
            h.deleteFile("/app/volume/photos.db"); // deleting the file prompts automatic rebuild
        });

        socket.on('changeCameraLocation', (camera_id, location) => {
            db.changeCameraLocation("/app/volume/photos.db", camera_id, location);
        });


        socket.on("deletePhoto", (cameraIDAsAString) => {
            console.log("Deleting photo from database with id: " + cameraIDAsAString);
            let cameraIDToDelete = parseInt(cameraIDAsAString);
            console.log(cameraIDToDelete);
            db.getPhotoFromIDPromise("/app/volume/photos.db", cameraIDToDelete).then((photo) => {
                db.deletePhotoFromID("/app/volume/photos.db", cameraIDToDelete);
                if(typeof photo.filename !== 'undefined'){
                    console.log("Deleting photo at : " + photo.filename);
                    h.deleteFile(photo.filename);
                }
            });
            
        })


        socket.on('Hello, World', (data) =>{
            console.log("hello world" + data);
        });

        socket.on("currentCameraID-request", () =>{

            db.getCameraIDFromDatabasePromise("/app/volume/photos.db").then((camera_id) => {
                console.log("sending current camera id: " + camera_id);
                socket.emit("currentCameraID-response", camera_id);  
            }, (error) => {
                console.log("Error when requesting current camera ID: " + error);
                socket.emit("currentCameraID-response", -1)
            })
            
        })
    });
}