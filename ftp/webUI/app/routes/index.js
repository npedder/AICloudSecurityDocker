// Contains the routes and registers them when initiliaized

'use strict';
const h = require('../helpers');
const path = require('path');
var fs = require('fs');
// var fileNames = fs.readdirSync("app/webUI/public/images");
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
                res.render('index',{
                    fileNames: fnamesTemp,
                    prevpage: 1, 
                    thispage: 1,
                    nextpage:2,
                    numberofpages: numberOfPages     
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

                res.render('index',{
                    fileNames: fnamesTemp,
                    thispage: id,
                    prevpage: prevpage,
                    nextpage: nextpage,
                    numberofpages: numberOfPages
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
