// var fs = require('fs');
// var files = fs.readdirSync('./images/');


function changeImage(a ,fileName, numberOfDogs, numberOfCats, numberOfPersons){
    document.getElementById("img").src = a;
    document.getElementById("fileNameText").textContent = "Image: " + fileName;
    document.getElementById("dogsText").textContent = "Dogs detected: " + numberOfDogs;
    document.getElementById("catsText").textContent = "Cats detected: " + numberOfCats;
    document.getElementById("personsText").textContent = "Persons detected: "  + numberOfPersons;
    console.log("INDEX: " + index)
}

// function printAllImages(){
//     console.log("all imgages:");
//     files.forEach(file =>{
//          console.log(file);
//     });
// }