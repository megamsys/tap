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

var socketio = require('socket.io');

/**
 * Export the socket io's listen function.
 */
exports.listen = function(server) {
	  io = socketio.listen(server); 
	  io.set('log level', 1); // configure it later.

	  io.sockets.on('connection', function (socket) { 
		  /** create a random tenant name attached to a node.
		   * for instance each tenant <localhost>/stream/node1
		   * will be assigned a name
		   * tenant_001. They will be joined to "node1".
		   * It is assumed that multiple tenants can watch node 1.
		   */
		  
	    tenantNumber = assignTenantName(socket, tenantNumber, nickNames, namesUsed); 
	    joinTenantToNode(socket, 'logstash'); /* The node name will be unique to a tenant. For now use Logstash 
	    But feed the appropriate from the URL. */ 

	    handleMessageBroadcasting(socket, nickNames); 
	    handleTenantNodeJoining(socket);

	    socket.on('tenant_node', function() { 
	      socket.emit('tenant_node', io.sockets.manager.tenant_node);
	    });

	    handleClientDisconnection(socket, nickNames, namesUsed); 
	  });
	};