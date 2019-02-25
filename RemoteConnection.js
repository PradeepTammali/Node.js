
//  A wrapper for the ssh2 client module by Brian White which makes it easier to run a sequence of commands over SSH.
var SSH = require('simple-ssh');
 
// Connection parameters 
var ssh = new SSH({
    host: '192.168.88.128',
    user: 'pradeep',
    port: 22,
    pass: 'password'
});
 
// Executing commands for in windows server
ssh.exec('aaaa > sample.txt', {
    out: function(stdout) {
        console.log(stdout);
    }
}).start();