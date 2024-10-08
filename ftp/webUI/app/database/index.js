'use strict';
const sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var currentIP = "";

let getPhotosDataFromDatabasePromise = (databaseFilePath, photoFilePath) =>{
    return new Promise((resolve, reject) => {
        if(fs.existsSync(databaseFilePath))
            {
                const db = new sqlite3.Database(databaseFilePath); //"/app/volume/photos.db"
                console.log("SELECT DISTINCT * FROM photos WHERE filename LIKE '%" + photoFilePath + "%'")
                db.each("SELECT DISTINCT * FROM photos WHERE filename LIKE '%" + photoFilePath + "%'", (err, row)=>{ //This might not have to be db each
                    if(err){
                        console.error(err.message);
                        reject(err);
                    } else{
                        let photo = new Photo(row.id, row.filename, row.dogs, row.cats, row.persons, row.camera_id);
                        //console.log(photo);
                        resolve(photo);
                    }
                    
                })
            } else {
                reject('No db file found');
            }
    })
}

//Adds a 
let addCameraToDatabase = (databaseFilePath, cameraIP) => {
        if(fs.existsSync(databaseFilePath))
            {
                currentIP = cameraIP;
                const db = new sqlite3.Database(databaseFilePath); //"/app/volume/photos.db"
                console.log('INSERT INTO cameras(location, ip) VALUES(?, ?)');
                db.run('INSERT INTO cameras(location, ip) VALUES(?, ?)', ["", cameraIP], (err) => {
                    if(err) {
                        console.error(err.message);
                        return(null);
                    }
                });
            } else {
                console.log("Error:no database found");
            }
}



let getCamerasDataFromDatabasePromise = (databaseFilePath) =>{
    return new Promise((resolve, reject) => {
        if(fs.existsSync(databaseFilePath))
            {
                const db = new sqlite3.Database(databaseFilePath); //"/app/volume/photos.db"
                let queryText = "SELECT * FROM cameras LIMIT 20";
                console.log(queryText);
                db.all(queryText, (err, rows)=>{
                    if(err){
                        console.error(err.message);
                        reject(err);
                    } else{
                        console.log(rows);
                        resolve(rows);
                    }
                    
                })
            } else {
                reject('No db file found');
            }
    })
}

let changeCameraLocation = (databaseFilePath, camera_id, location) => {
    if(fs.existsSync(databaseFilePath))
        {
            const db = new sqlite3.Database(databaseFilePath); //"/app/volume/photos.db"
            let queryText = "UPDATE cameras \
            SET location = (?) \
            WHERE \
                camera_id = (?);"

            db.run(queryText, [location, camera_id], (err) => {
                if(err) {
                    console.error(err.message);
                    return(null);
                }
            });
        } else {
            console.log("Error:no database found");
        }
}


let getCameraIDFromDatabasePromise = (databaseFilePath) =>{
    return new Promise((resolve, reject) => {
        if(fs.existsSync(databaseFilePath))
            {
                const db = new sqlite3.Database(databaseFilePath); //"/app/volume/photos.db"
                console.log("CURRENT IP: " + currentIP);
                let queryText = "SELECT * FROM cameras WHERE ip LIKE '%" + currentIP + "%'";
                console.log(queryText);
                db.all(queryText, (err, rows)=>{
                    if(err){
                        console.error(err.message);
                        reject(err);
                    } else{
                        console.log(rows);
                        resolve(rows[0].camera_id);
                    }
                    
                })
            } else {
                reject('No db file found');
            }
    })
}


let deletePhotoFromID = (databaseFilePath, photoID) =>{
    if(fs.existsSync(databaseFilePath))
        {
            const db = new sqlite3.Database(databaseFilePath); //"/app/volume/photos.db"
            let queryText = "DELETE FROM photos WHERE id = (?)"
            db.run(queryText, [photoID], (err) => {
                if(err) {
                    console.error(err.message);
                    return(null);
                }
            });
        } else {
            console.log("Error:no database found");
        }
}


let getPhotoFromIDPromise = (databaseFilePath, photoID) =>{
    return new Promise((resolve, reject) => {
        if(fs.existsSync(databaseFilePath))
            {
                const db = new sqlite3.Database(databaseFilePath); //"/app/volume/photos.db"
                let queryText = "SELECT * FROM photos WHERE id = (?)";
                console.log(queryText);
                db.all(queryText, [photoID], (err, rows)=>{
                    if(err){
                        console.error(err.message);
                        reject(err);
                    } else{
                        console.log(rows);
                        resolve(rows[0]);
                    }
                    
                })
            } else {
                reject('No db file found');
            }
    })
}

// Photos class contains the data of one element to be stored in the photos table of the database
class Photo{        
    constructor(id, fileName, dogs, cats, persons, camera_id){
        if (arguments.length == 6){
            this.id = id;
            this.fileName = fileName;
            this.dogs = dogs;
            this.cats= cats;
            this.persons= persons; 
            this.camera_id= camera_id;
        } else { // Load default photo 
            this.id = -1;
            this.fileName = "";
            this.dogs = -1;
            this.cats= -1;
            this.persons= -1; 
            this.cameraId= -1 
        }   
    }
}

class Camera{
    constructor(camera_id, location, ip){
        if (arguments.length == 3){
            this.id = id;
            this.location  = location;
            this.ip = ip;
        } else { // Load default photo 
            this.camera_id = -1;
            this.fileName = "";
            this.ip = "";
        }   
    }
}
    

module.exports = {
    currentIP,
    getPhotosDataFromDatabasePromise,
    addCameraToDatabase,
    getCamerasDataFromDatabasePromise,
    getCameraIDFromDatabasePromise,
    getPhotoFromIDPromise,
    changeCameraLocation,
    deletePhotoFromID,
    Photo
}
