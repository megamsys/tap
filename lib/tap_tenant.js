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
var namesUsed = [];
var currentRoom = {};
var path, roomname;

var socketio = require('socket.io');

var tapdb = require('./tap_source.js');

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
		console.log("socket connection");
		tenantNumber = assignTenantName(socket, tenantNumber, nickNames,
				namesUsed);
		joinTenantToNode(socket, 'logstash'); /*
												 * The node name will be unique
												 * to a tenant. For now use
												 * Logstash But feed the
												 * appropriate from the URL.
												 */
		handleMessageBroadcasting(socket, nickNames);
		handleClientDisconnection(socket, nickNames, namesUsed);
	});
};

function assignTenantName(socket, tenantNumber, nickNames, namesUsed) {
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

function handleMessageBroadcasting(socket, nickNames) {
	/*
	 * console.log("message broadcast"+nickNames[socket.id]); db.on('message',
	 * function (channel,message) { console.log("message broadcast1");
	 * socket.emit("message","hello");
	 * socket.broadcast.to(nickNames[socket.id]).emit('message',message); });
	 */
	socket.emit("message", "helllo");
}

function handleClientDisconnection(socket) {
	socket.on('disconnect', function() {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}
