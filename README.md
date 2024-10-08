# AI Cloud Security Docker
A Docker server application that can recieve an image via a NodeJS FTP server container, predict the contents of the image using Ultralytics yolov8 detection module, and report the findings back to the user. All with real time viewing, editing, and deleting via a simple WebGUI!

## Setup 
In the Dockerfile within the ftp folder, change the environment variables according to your environment. The "key.pem" and "cert.pem" files will need to be created and placed in the ftp folder.
```
ENV IP = '10.0.0.210'
ENV PORT=7004
ENV KEY_FILE="key.pem"
ENV CERT_FILE="cert.pem"
```

In the compose.yaml file, the ports in the node service will need to be changed based on the ports open on your host machine. Change YOURPORT to the port open on  your computer, the port after the semicolon needs to match the port the docker exposed.
```
node:
    build: .\ftp
    ports:
      - "7010:7004"
```

Note: The photos volume defined in the compose.yaml will be where your photos are stored. 

## Create the docker
To create the image for the docker: 
```
docker compose build
```

To run the docker:
```
docker compose up
```

## Usage
### Sending files via ftp
The ftp server will be compatible with most modern ftp clients. 

In your client of choice, set the ip address of the server to the local ip address of your host machine. Set the port to the mapping defined in the compose.yaml file (defaults to 7010). 

The username and password of the ftp user are defined in the "ftp/Dockerfile" file. As of now, this cannot be changed after building the container. The default username is ftpuser and the default password is pass. 

### Accessing the user interface
Connect to the web GUI using localhost:3000 in your web browser.

From the web GUI, you can view images the photos taken by your security cameras. Clicking on an image will display the photo's ID, the AI detection results, and the camera that took the photo.

Clicking on the "Cameras" button will bring you to a new page where you can view the camera id and change the location information of your cameras. 

### Locating images
All the images recieved via ftp will be stored in the photos volume defined in the compose.yaml. 

An SQLite database file titled "photos.db" will also be in this volume.

## Warning:
Proper ftp over tls has not yet been configured, so files sent over ftp are in unencrypted clear text. 
