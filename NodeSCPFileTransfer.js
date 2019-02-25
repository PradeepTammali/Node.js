
// variable declaration 
var path, node_ssh, ssh, fs;

// importing express server
var express = require('express');
var app = express();

fs = require('fs');
path = require('path');

// Module to connect to remote server
node_ssh = require('node-ssh');
ssh = new node_ssh();

// Password to connect to remote server
var password = '';

ssh.connect({
    host: 'localhost',  // remote server name or IP
    username: 'username', // remote server username 
    port: 22,              
    password: password,  
    privateKey: '/home/pradeep/.ssh/id_rsa'  // private key to connect to remote server (optional)
}).then(function () {

    // Download the file from destination server 
    ssh.getFile('/home/pradeep/Pictures/sample.png', '/home/pradeep/Pictures/ip.png').then(function (Contents) {
        console.log("The File's contents were successfully downloaded");
    }, function (error) {
        console.log("Something's wrong");
        console.log(error);
    });

});

//  Readind the downloaded file from local machine
function read(file, callback) {
    fs.readFile(file, function (err, imageData) {
        if (err) console.log('Error:', err);
        callback(null, imageData);
    });
}

// Hosting the server
app.get('/', function (req, res) {

    var data = null;

    read('/home/pradeep/Pictures/sample.png', function (err, content) {
        data = content;
        // console.log(data);
    });

    // Send the file to the fronend to display or download 
    
    // res.download('/home/pradeep/Pictures/sample.png', 'sample.png');
    res.contentType('image/png');
    res.status(200).send(data, "binary");

});

app.listen(3000);
console.log('listing on port 3000');