// Contains the routes and registers them when initiliaized

'use strict';
const h = require('../helpers');
const path = require('path');
const databaseHandler = require('../database')
var fs = require('fs');


var fileNames = fs.readdirSync("/app/volume/volume");
console.log("FileName: ");
console.log(fileNames);
var itemsPerPage = 3;
var numberOfPages = h.calcNumberOfPages(fileNames.length, itemsPerPage);


module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) =>{
                fileNames = fs.readdirSync("/app/volume/volume");
                numberOfPages = h.calcNumberOfPages(fileNames.length, itemsPerPage);
                let photosData = [];
                res.render('index',{
                    fileNames: fileNames,
                    thispage: 1,
                    prevpage:  1,
                    nextpage: 2,
                    numberofpages: numberOfPages                 
                });
            },

            '/1': (req, res, next) =>{
                fileNames = fs.readdirSync("/app/volume/volume");
                numberOfPages = h.calcNumberOfPages(fileNames.length, itemsPerPage);
                var fnamesTemp = fileNames.slice(0,3);
                let photosData = [];
                h.loadPhotoDataToArrayPromise(fnamesTemp).then((arrayRecieved) => {
                    photosData = arrayRecieved;
                    //console.log(arrayRecieved);
                    res.render('index',{
                        fileNames: fnamesTemp,
                        fileData: photosData,
                        prevpage: 1, 
                        thispage: 1,
                        nextpage:2,
                        numberofpages: numberOfPages,
                        imageIndex: 0     
                    });   
                }, (error) =>{
                    console.log("ERROR IN ROUTER PROMISE"+ error)
                });
            },
            '/:id':(req, res, next) => {       
                fileNames = fs.readdirSync("/app/volume/volume"); 
                numberOfPages = h.calcNumberOfPages(fileNames.length, itemsPerPage);        
                var id = parseInt(req.params.id);
                
                if(id>numberOfPages){
                    id = numberOfPages;
                }
                
                var nextpage = parseInt(id) + 1; 
                var prevpage = nextpage - 2;
                var fnamesTemp = fileNames.slice(id*3 - 3, id * 3);
                
                let photosData = [];
                h.loadPhotoDataToArrayPromise(fnamesTemp).then((arrayRecieved) => {
                    photosData = arrayRecieved;
                    //console.log(arrayRecieved);
                    res.render('index',{
                        fileNames: fnamesTemp,
                        fileData: photosData,
                        prevpage: prevpage, 
                        thispage: id,
                        nextpage:nextpage,
                        numberofpages: numberOfPages,
                        imageIndex: 0     
                    });   
                }, (error) =>{
                    console.log("ERROR IN ROUTER PROMISE"+ error)
                });
            }
        }, 
        'post':{

        },

        'NA': (req,res, next) => {
            res.status(404).sendFile(process.cwd() + '/webUI/views/404.htm');
        }
    }


   
return h.route(routes);
}
