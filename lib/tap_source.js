var amqp = require('amqp');
var yaml = require('./tap_config.js');

exports.ss = function(logname, socket, currentRoom) {
var connection = amqp.createConnection({ host: 'localhost' });
connection.on('ready', function () {
    var queue = connection.queue(logname);
    queue.bind('#'); // all messages

    queue.subscribe(function (message) {
console.log("Message Received ");
console.log(message.data.toString('ascii'));
console.log("=======>"+currentRoom[socket.id]);
        //socket.in(currentRoom[socket.id]).emit('message', {name:currentRoom[socket.id], logs:message.data.toString('ascii') });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {name:currentRoom[socket.id], logs:message.data.toString('ascii') });
console.log("Message emited");
  });
});
}



