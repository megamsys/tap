//var redis = require('redis');
var amqp = require('amqp');
var yaml = require('./tap_config.js');

//var db = redis.createClient(yaml.config.redis.port, yaml.config.redis.host);

//var connection = amqp.createConnection({ host: 'localhost' });

exports.ss = function(logname, socket, currentRoom) {
var connection = amqp.createConnection({ host: 'localhost' });
connection.on('ready', function () {
  //io.sockets.on('connection', function (socket) {
    var queue = connection.queue(logname);
    queue.bind('#'); // all messages

    queue.subscribe(function (message) {
console.log("Message Received ");
console.log(message.data.toString('ascii'));
        socket.in(currentRoom[socket.id]).emit('message', {name:currentRoom[socket.id], logs:message });
  });
});
}



