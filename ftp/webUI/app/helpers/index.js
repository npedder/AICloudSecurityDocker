//Registers routes for the router
'use strict';
const router = require('express').Router();
const databaseHandler = require('../database');
const fs = require('fs');

//Iterate through the routes object and mount the route
//Recursive 
let _registerRoutes = (routes, method) => {         //underscore denotes private function 
    for(let key in routes){
        if(typeof routes[key] === 'object' && routes[key] != null && !(routes[key] instanceof Array)){
            // console.log('routes[key] = ', routes[key],'key = ', key)
            _registerRoutes(routes[key], key); //recursive call, on second call passes in http method as second paramater
        }
        else {
            //Register the routes
            if (method === 'get') {
                 // console.log('routes[key] = ', routes[key],'key = ', key)
                router.get(key, routes[key]);
            } else if(method === 'post') {
                // console.log('routes[key] = ', routes[key],'key = ', key)
                router.post(key, routes[key]);
            } else{
                router.use(routes[key]);
            }
        }
    }
}

let route = routes => {     //public call of _registerRoutes function
    _registerRoutes(routes);    
    return router;
}

let calcNumberOfPages = (numberOfItems, itemsPerPage) => {  //to determine how many pages are needed to host all items
    let numPages = numberOfItems / itemsPerPage;
    numPages = Math.trunc(numPages);
    if (numberOfItems % itemsPerPage != 0)
    { 
        numPages = numPages +1;
    }

    return numPages;
}

let loadPhotoDataToArrayPromise = (fileNames) => {
        return new Promise((resolve, reject) => {
            let photosData = []; 
            let queriesCompleted = 0;
            for(let i = 0; i < fileNames.length; i++){
                databaseHandler.getPhotosDataFromDatabasePromise("/app/volume/photos.db", fileNames[i])
                 .then((dataReturned) => {
                    
                    photosData[i] = dataReturned;
                    //console.log(photosData[i]);
                    console.log("FILENAMES LENGTH: "+ fileNames.length + ", I : " + i);
                    queriesCompleted +=1;
                    console.log("QueriesCompleted:" + queriesCompleted);

                    if(queriesCompleted == fileNames.length){
                        console.log(photosData);
                        resolve(photosData);
                    }

                 }, (error) => {
                    queriesCompleted +=1;
                    console.log('error');
                    reject(error);
                 });
                 
            
            }

            setTimeout(() =>{
              if (queriesCompleted != fileNames.length){
                console.log("Timed out");
                reject('Timeout');
            }
            }, 6000);

                
        });
        
}



let loadCamerasDataToArrayPromise = () => { // a wrapper for getCameraDataFromDatabasePromise
    return new Promise((resolve, reject) => {
        databaseHandler.getCamerasDataFromDatabasePromise("/app/volume/photos.db")
         .then((dataReturned) =>{
            resolve(dataReturned)
        }, (error) => {
            reject(error)
        });

    });
}

let deleteFile = (filePath) =>{
    fs.rm(filePath, (error) => {
        console.log("ERROR: " + error);
    });
}




module.exports = {  //exports the route function
    route,
    calcNumberOfPages,
    loadPhotoDataToArrayPromise,
    loadCamerasDataToArrayPromise,
    deleteFile
}