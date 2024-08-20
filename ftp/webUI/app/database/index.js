'use strict';
const sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

let getDataFromDatabasePromise = (databaseFilePath, photoFilePath) =>{
    return new Promise((resolve, reject) => {
        if(fs.existsSync(databaseFilePath))
            {
                const db = new sqlite3.Database(databaseFilePath); //"/app/volume/photos.db"
                console.log("SELECT DISTINCT * FROM photos WHERE filename LIKE '%" + photoFilePath + "%'")
                db.each("SELECT DISTINCT * FROM photos WHERE filename LIKE '%" + photoFilePath + "%'", (err, row)=>{
                    if(err){
                        console.error(err.message);
                        reject(err);
                    } else{
                        let photo = new Photo(row.id, row.filename, row.dogs, row.cats, row.persons, row.camera_id);
                        console.log(photo);
                        resolve(photo);
                    }
                    
                    // photo.id = row.id;  
                    // photo.fileName = row.filename;
                    // photo.dogs = row.dogs;
                    // photo.cats = row.cats;
                    // photo.persons = row.persons;
                    // photo.cameraId= row.camera_id;
                    // console.log(photo);
                })
            } else {
                reject('No db file found');
            }
    })
}

// Photos class contains the data of one element to be stored in the photos table of the database
class Photo{        // Default constructor
    constructor(id, fileName, dogs, cats, persons, cameraId){
        if (arguments.length == 6){
            this.id = id;
            this.fileName = fileName;
            this.dogs = dogs;
            this.cats= cats;
            this.persons= persons; 
            this.cameraId= cameraId;
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

    

module.exports = {
    getDataFromDatabasePromise,
    Photo
}
