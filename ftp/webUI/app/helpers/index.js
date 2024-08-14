//Registers routes for the router
'use strict';
const router = require('express').Router();

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





module.exports = {  //exports the route function
    route,
    calcNumberOfPages
}