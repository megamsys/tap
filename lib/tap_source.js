//var redis = require('redis');
var amqp = require('amqp');
var yaml = require('./tap_config.js');

// var db = redis.createClient(yaml.config.redis.port, yaml.config.redis.host);
// var connection = amqp.createConnection({ host: 'localhost' });

exports.ss = function(logname, socket, currentRoom) {
	// Open a connection
	console.log("amqp entry");
	var conn = amqp.createConnection({ host: yaml.config.amqp.host }, {
		  reconnect: true, // Enable reconnection
		  reconnectBackoffStrategy: 'linear',
		  reconnectBackoffTime: 1000, // Try reconnect once a second
		}); 
	
	// When connected..
	conn.on('ready', function () {
	 console.log("amqp conn entry");
	  // create a queue
	  conn.queue(logname, { passive: true }, function(queue) { 
	    // subscribe to that queue	 
	    queue.subscribe(function(msg) {
	      console.log("Message Received ");
	      console.log(msg.data.toString('ascii'));
	     //socket.in(currentRoom[socket.id]).emit('message', {name:currentRoom[socket.id], logs:msg.data.toString('ascii') });
	      io.to(currentRoom[socket.id]).emit ('message', {name:currentRoom[socket.id], logs:msg.data.toString('ascii') });
	      //socket.broadcast.to(currentRoom[socket.id]).emit('message', {name:currentRoom[socket.id], logs:msg.data.toString('ascii') });
	    });
	    
	  });
	});
}


