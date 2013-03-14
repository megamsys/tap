/**
 * The default configuration file uses yaml.
 * The configuration settings are available in config/app.yaml.
 * https://npmjs.org/package/yaml-config#readme
 */
var config = require('yaml-config');
var fs = require('fs');
var path = require('path');
var util = require('util');
var tap_root="/home/ubuntu/tap";
//var tap_root = process.env.PWD;
//console.log("process path------------>"+process.env.PWD);
var pajson =  tap_root + path.sep + 'package.json';
console.log("Path----------------------->"+pajson);
var pjson = JSON.parse(fs.readFileSync(pajson, 'utf8'));
var version = pjson.version;
var desc = pjson.description;



var conf_file =  tap_root + path.sep + 'app.yaml';

fs.exists(conf_file, function (exists) {
  util.debug(exists ? "Tap("+ path.basename(conf_file) +") is configured." : "no configuration file found!" + conf_file);
});
var value;
var string="";
/*This code to check which file(default, test, or production) to get from app.yaml*/
var arg= process.argv.forEach(function (val, index, array) {
  var str = val; 
  var matches = str.split(/\b/);
  var check=matches.length > 0 ? matches[1] : ""
  if(check=='conf'){
     string = val.split('=').pop();
     console.log("Argument------>"+string);
     }
});

var settings = config.readConfig(conf_file, string); // path from your app root without slash
/**
 * To use it, config.redis.port..etc.
 * To read about exports => http://openmymind.net/2012/2/3/Node-Require-and-Exports/
 */
module.exports.config = settings;
module.exports.tap_root = tap_root;
module.exports.version = version;
module.exports.desc = desc;
