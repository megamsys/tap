var amqp = require('amqp');
var yaml = require('./tap_config.js');

// var db = redis.createClient(yaml.config.redis.port, yaml.config.redis.host);
// var connection = amqp.createConnection({ host: 'localhost' });
var currentTags = {};
exports.conn = function() {
	var connection;

	// Open a connection
	connection = amqp.createConnection({
		host : yaml.config.amqp.host
	}, {
		reconnect : true, // Enable reconnection
		reconnectBackoffStrategy : 'linear',
		reconnectBackoffTime : 1000, // Try reconnect once a second
	});
	return connection;
}

exports.disconn = function(currentConnections, socket, currentRoom) {
	var conn = currentConnections[socket.id];
	// When connected..
	conn.on('ready', function() {

		// create a queue
		conn.queue(currentRoom[socket.id], {
			passive : true
		}, function(queue) {
			// subscribe to that queue
			queue.unsubscribe(currentTags[socket.id]);
		});
	});
	conn.end();
}

exports.ss = function(logname, socket, currentRoom, currentConnections) {
	var conn = currentConnections[socket.id];
	// When connected..
	conn.on('ready', function() {

		// create a queue
		conn.queue(logname, {
			passive : true
		}, function(queue) {
			// subscribe to that queue
			queue.subscribe(function(msg) {
				io.to(currentRoom[socket.id]).emit('message', {
					name : currentRoom[socket.id],
					logs : msg.data.toString('ascii')
				});
			}).addCallback(function(ok) { currentTags[socket.id] = ok.consumerTag; });
		});
	});

}

