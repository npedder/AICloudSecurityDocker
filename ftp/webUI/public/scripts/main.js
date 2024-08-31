// var fs = require('fs');
// var files = fs.readdirSync('./images/');

const socket = io();

socket.on('connection');

socket.on('rebuild');

function sendRebuild(){
    socket.emit('rebuild', "This is data i sent");
}

function changeImage(a ,fileName, numberOfDogs, numberOfCats, numberOfPersons){
    document.getElementById("img").src = a;
    document.getElementById("fileNameText").textContent = "Image: " + fileName;
    document.getElementById("dogsText").textContent = "Dogs detected: " + numberOfDogs;
    document.getElementById("catsText").textContent = "Cats detected: " + numberOfCats;
    document.getElementById("personsText").textContent = "Persons detected: "  + numberOfPersons;
}

function submitLocation(i, camera_id){
    let locationText = document.getElementById("locationInput" + i).value;
    document.getElementById("locationText" + i).textContent = "Location: " + locationText;
    socket.emit('changeCameraLocation', camera_id, locationText);
}   
    
   

// function printAllImages(){
//     console.log("all imgages:");
//     files.forEach(file =>{
//          console.log(file);
//     });
// }