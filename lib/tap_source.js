var redis = require('redis');
var yaml = require('./tap_config.js');

var db = redis.createClient(yaml.config.redis.port, yaml.config.redis.host);
var dbAuth = function() {
	db.auth();
	console.log("redis connected :" + yaml.config.redis.host + ":"
			+ yaml.config.redis.port);
}

db.addListener('connected', dbAuth);
db.addListener('reconnected', dbAuth);
dbAuth();

/**
 * export this code outside., so you could call subscribe and message as you
 * wish. parameterize the input, eg: logstash, channel, message which can be fed
 * externally.
 */

exports.ss = function(logname) {
	db.subscribe(logname, function(channel, message) {
		try {
			console.log("subscribed");
		} catch (SyntaxError) {
			return false;
		}
	});
}

/* this code export the message to "tap_tenant.js" and to emit the message */

exports.tt = function(socket, currentRoom) {
	db.on('message', function(channel, message) {
		// socket.emit("message",message);
		if (channel == currentRoom[socket.id]) {
			console.log("broadcast print");
			console.log(currentRoom[socket.id]);
			//socket.broadcast.to(currentRoom[socket.id])
					//.emit('message', message);
			socket.broadcast.to(currentRoom[socket.id])
			.emit('message', {name:currentRoom[socket.id], logs:message });
		}
	});
};
