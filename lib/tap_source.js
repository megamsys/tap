var redis = require('redis');
var app_yaml  = require('./lib/tap_config.js');

var db = redis.createClient(app_yaml.redis.port, app_yaml.redis.host);

var dbAuth = function() {
	db.auth();
	console.log("redis connected");
}

db.addListener('connected', dbAuth);
db.addListener('reconnected', dbAuth);
dbAuth();

/**
 * export this code outside., so you could call subscribe and message as you wish.
 * parameterize the input, eg: logstash, channel, message which can be fed externally.
 */
db.subscribe("logstash", function(channel, message) {
	try {
		console.log("subscribed");
	} catch (SyntaxError) {
		return false;
	}
});

db.on("message", function(channel, message) {
	socket.emit("message", message);
});
