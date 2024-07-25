//TODO: Change TLSOptions to options.tls and incorporate tls certificates.
// As of now, everything is being sent as clear text, no encrption.
//Usage - run npm start server.js
//FILEZILLA ip is 127.0.1.1  or no password no username port 7004. Needs username and password to connect to other pcs on LAN
//When an image is recieved, it will run the python script process and will return if dog or no
"use strict";
require('dotenv').config('/.env')
var ftpd = require('ftpd');
var fs = require('fs');


var path = require('path');
var keyFile;
var certFile;
var server;
var options = {
  host: process.env.IP || '127.0.1.1',
  port: process.env.PORT || 21,
  tls: null,
};


if (process.env.KEY_FILE && process.env.CERT_FILE) {
  console.log('Running as FTPS server');
  if (process.env.KEY_FILE.charAt(0) !== '/') {
    keyFile = path.join(__dirname, process.env.KEY_FILE);
  }

  if (process.env.CERT_FILE.charAt(0) !== '/') {

    certFile = path.join(__dirname, process.env.CERT_FILE);

  }

  options.tls = {
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(certFile),
    ca: !process.env.CA_FILES ? null : process.env.CA_FILES

      .split(':')

      .map(function(f) {

        return fs.readFileSync(f);

      }),

  };

} else {
  console.log();
  console.log('*** To run as FTPS server,                 ***');
  console.log('***  set "KEY_FILE", "CERT_FILE"           ***');
  console.log('***  and (optionally) "CA_FILES" env vars. ***');
  console.log();
}


server = new ftpd.FtpServer(options.host, {
  getInitialCwd: function() {
    return '/volume';
  },
  getRoot: function() {
    return (process.cwd() + '/volume');
  },
  pasvPortRangeStart: 49152, //was 1025
  pasvPortRangeEnd: 65534, // was 1005
  tlsOptions: null, //options.tls,
  allowUnauthorizedTls: true,
  useWriteFile: false,
  useReadFile: false,
  uploadMaxSlurpSize: 7000, // N/A unless 'useWriteFile' is true.
});


server.on('error', function(error) {
  console.log('FTP Server error:', error);
});


server.on('client:connected', function(connection) {
  var username = null;
  console.log('client connected: ' + connection.remoteAddress);
  connection.on('command:user', function(user, success, failure) {

    if (user) {
      username = user;
      success();
    } else {
      failure();
    }

  });


  connection.on('command:pass', function(pass, success, failure) {
    if (pass) {
      success(username);
      
    } else {
      failure();
    }
 });
});



server.debugging = 4;

server.listen(options.port);


console.log('Listening on port ' + options.port);

