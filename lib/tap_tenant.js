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

var tenantNumber = 1;
var nickNames = {};
var currentRoom = {};
var path, roomname;
var namesUsed = [];
var socketio = require('socket.io');

var tapdb = require('./tap_source.js');
var tap = require("../tap.js");
/**
 * Export the socket io's listen function.
 */
exports.listen = function(server) {
	io = socketio.listen(server);
	io.set('log level', 1); // configure it later.
	console.log("listen called");
	io.sockets.on('connection', function(socket) {
		/**
		 * create a random tenant name attached to a node. for instance each
		 * tenant <localhost>/stream/node1 will be assigned a name tenant_001.
		 * They will be joined to "node1". It is assumed that multiple tenants
		 * can watch node 1.
		 */
                 var logname="";
		console.log("socket connection");
		tenantNumber = assignTenantName(socket, tenantNumber, nickNames,
				namesUsed);
		logname=tap.logname;                /* import the request id from tap.js and this logname is equal redis key */
                   console.log("logname "+logname);
                    var subscribe = tapdb.ss(logname);
		joinTenantToNode(socket, logname);
		 /*
			 * The node name will be unique
			 * to a tenant. For now use
			 * Logstash But feed the
			 * appropriate from the URL.
		 */
		handleMessageBroadcasting(socket, currentRoom);
		handleClientDisconnection(socket, nickNames);
	});
};

function assignTenantName(socket, tenantNumber, nickNames) {
	var name = 'Tenant' + tenantNumber;
	nickNames[socket.id] = name;
	return tenantNumber + 1;
}

function joinTenantToNode(socket, room) {
	console.log("joining");
	socket.join(room);
	currentRoom[socket.id] = room;
	console.log("joining");
	console.log(room);
	return currentRoom[socket.id];
}

function handleMessageBroadcasting(socket, currentRoom) {
	
	 console.log("message broadcast : "+currentRoom[socket.id]); 
	 console.log("Broadcast");
	 var message = tapdb.tt(socket,currentRoom);

}

function handleClientDisconnection(socket) {
	socket.on('disconnect', function() {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete nickNames[socket.id];
	});
}
