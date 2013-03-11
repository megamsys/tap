
var redis = require('redis');
//var app_yaml  = require('./lib/tap_config.js');                               //To use after connect config file

var db = redis.createClient(6379, "localhost");                                  ///modified

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


//require('./lib/tap_tenant.js');



