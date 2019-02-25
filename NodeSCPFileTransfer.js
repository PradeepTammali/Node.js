
var path, node_ssh, ssh, fs;

var express = require('express');
var app = express();

fs = require('fs');
path = require('path');
node_ssh = require('node-ssh');
ssh = new node_ssh();

var password = '';

ssh.connect({
    host: 'localhost',
    username: 'username',
    port: 22,
    password: password,
    privateKey: '/home/tcs/.ssh/id_rsa'
}).then(function () {

    ssh.getFile('/home/pradeep/Pictures/sample.png', '/home/pradeep/Pictures/ip.png').then(function (Contents) {
        console.log("The File's contents were successfully downloaded");
    }, function (error) {
        console.log("Something's wrong");
        console.log(error);
    });

});

function read(file, callback) {
    fs.readFile(file, function (err, imageData) {
        if (err) console.log('Error:', err);
        callback(null, imageData);
    });
}


app.get('/', function (req, res) {

    var data = null;

    read('/home/pradeep/Pictures/sample.png', function (err, content) {
        data = content;
        // console.log(data);
    });

    // res.download('/home/pradeep/Pictures/sample.png', 'sample.png');
    res.contentType('image/png');
    res.status(200).send(data, "binary");

});

app.listen(3000);
console.log('listing on port 3000');