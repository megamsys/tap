
var redis = require('redis');
var yaml  = require('./tap_config.js');                               

var db = redis.createClient(yaml.config.redis.port, yaml.config.redis.host);

var dbAuth = function() {
	db.auth();
	console.log("redis connected :"+yaml.config.redis.host +":"+yaml.config.redis.port);
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