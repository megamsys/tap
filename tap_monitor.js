var forever = require('forever-monitor');
var util = require('util'),
    path = require('path');
script = path.join(__dirname, './tap_cluster.js');
        
var child1 = new (forever.Monitor)(script, { 'options': [ "--conf=production"] });
child1.start();
util.puts('Forever process running tap_cluster.js on 7000');



  child1.on('exit', function () {
    console.log('your-filename.js has exited after 3 restarts');
  });


