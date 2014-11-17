/*
** Copyright [2013] [Megam Systems]
**
** Licensed under the Apache License, Version 2.0 (the "License");
** you may not use this file except in compliance with the License.
** You may obtain a copy of the License at
**
** http://www.apache.org/licenses/LICENSE-2.0
**
** Unless required by applicable law or agreed to in writing, software
** distributed under the License is distributed on an "AS IS" BASIS,
** WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
** See the License for the specific language governing permissions and
** limitations under the License.
*/

var fs = require('fs'), io = require('socket.io'), net = require('net'), util = require('util'), url = require('url'), http = require('http'), path = require('path'), mime = require('mime');

var tap_tenant = require('./lib/tap_tenant.js');
var yaml = require('./lib/tap_config.js');

/**
* Create a server to listen on port 7000. TO-DO: Make port configurable in a js
* or json file.
*/
var express = require('express');
var app = express();
var server = http.createServer(app)
tap_tenant.listen(server);

server.listen(yaml.config.server.port);
console.log("Tap Server:" + yaml.version + " listening on port ="
                + yaml.config.server.port);


/* It is sends the index.html file */
app.get('/:id', function(req, res) {
        /**
         * call the subscribe code. in tap_source before the send
         */
        console.log(req.url);        
        console.log("param name" + req.params.id);
        console.log("--------------------->"+__dirname);
        res.sendfile(__dirname + '/public/index.html');        
        //res.sendfile('/home/rajthilak/code/megam/workspace/nilavu/app/views/cloud_books_histories/index.html');
        //res.send('hai');
        exports.logname = req.params.id; /*
                                                                                 * exports the request id to
                                                                                 * tap_tenant.js file
                                                                                 */
});

/* This take the typical use-case of serving files in ./public */
app.use(express.static(__dirname + '/public'));
