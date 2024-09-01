// var fs = require('fs');
// var files = fs.readdirSync('./images/');

const socket = io();

socket.on('connection');

socket.on('rebuild');

function sendRebuild(){
    socket.emit('rebuild', "This is data i sent");
}

function changeImage(a, id, fileName, numberOfDogs, numberOfCats, numberOfPersons, camera_id){
    document.getElementById("img").src = a;
    document.getElementById("photoIDText").textContent = "Image ID: " + id;
    document.getElementById("fileNameText").textContent = "Image Path: " + fileName;
    document.getElementById("dogsText").textContent = "Dogs detected: " + numberOfDogs;
    document.getElementById("catsText").textContent = "Cats detected: " + numberOfCats;
    document.getElementById("personsText").textContent = "Persons detected: "  + numberOfPersons;
    document.getElementById("cameraIDText").textContent = "Camera: "  + camera_id;
}

function submitLocation(i, camera_id){
    let locationText = document.getElementById("locationInput" + i).value;
    document.getElementById("locationText" + i).textContent = "Location: " + locationText;
    socket.emit('changeCameraLocation', camera_id, locationText);
}   

function deletePhoto(){
    photoID = document.getElementById("photoIDText").textContent;
    photoID = photoID.substring(10);
    socket.emit('deletePhoto', photoID);

}   
    
   

// function printAllImages(){
//     console.log("all imgages:");
//     files.forEach(file =>{
//          console.log(file);
//     });
// }