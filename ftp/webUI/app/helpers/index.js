//Registers routes for the router
'use strict';
const router = require('express').Router();
const databaseHandler = require('../database')

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
            for(let i = 0; i < fileNames.length; i++){
                databaseHandler.getDataFromDatabasePromise("/app/volume/photos.db", fileNames[i])
                 .then((dataReturned) => {
                    
                    photosData[i] = dataReturned;
                    //console.log(photosData[i]);
                    if (i == fileNames.length - 1){
                        //console.log(photosData);
                        resolve(photosData);
                    }
                 }, (error) => {
                    reject(error);
                 });
                
                //console.log(databaseHandler.getDataFromDatabase("/app/volume/photos.db", fileNames[i], photosData[i])); //undefined
            }
            // console.log(photosData);
            // resolve(photosData);
        })
        
    
}



module.exports = {  //exports the route function
    route,
    calcNumberOfPages,
    loadPhotoDataToArrayPromise
}