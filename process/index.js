"use strict";
const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["/app/VideoRecog/main.py", arg1, arg2,]);
//Then all you have to do is make sure that you import sys in your python script, and then you can access arg1 using sys.argv[1], arg2 using sys.argv[2], and so on.

//To send data back to node just do the following in the python script:

// print(dataToSendBack)
// sys.stdout.flush()

//And then node can listen for data using:

let processData = () => {
    pythonProcess.stdout.on('data', (data) => {
        console.log("DATA RECIEVED:" + data);
    });
}


module.exports() = {
    spawn,
    pythonProcess,
    processData
}
