# AI Cloud Security Docker
A docker application that can recieve an image via a NodeJS FTP server container and predict the contents of the image using Ultralytics yolov8 detection module and report the findings back to the user. Now with a simple WebGUI!

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
Connect to the web gui using localhost:3000

## Warning:
Proper ftp over tls has not yet been configured, so files sent over ftp are in unencrypted clear text. 
