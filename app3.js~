var fs = require('fs'),
    io = require('socket.io'),
    net = require('net'),
    sys = require('util'),
    url = require('url'),
    http = require('http'),
    path = require('path'),
    mime = require('mime'),
    redis = require('redis');
//var S = require('string');

//var s = require('underscore.string');
var user=[];
var p_user=[];
var client_id=[];
var clientNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};
var path, roomname;
var username;

var express = require('express');
var app = express();
var server = http.createServer(app)
io = io.listen(server);

server.listen(8000);

var db = redis.createClient(6379, "localhost");
var dbAuth = function() { db.auth();console.log("redis connected"); }
db.addListener('connected', dbAuth);
db.addListener('reconnected', dbAuth);
dbAuth();

db.keys('*', function (err, keys) {
  if (err) return console.log(err);

  for(var i = 0, len = keys.length; i < len; i++) {
    console.log(keys[i]);
}
  });

console.log("created");

app.get('/streams/:id', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
                      var logname = req.params.id;
                      db.subscribe(logname, function(channel, message) {
                       try { console.log("subscribed"); } catch (SyntaxError) { return false; }
                    });
//res.send(req.params.id);
console.log("param name"+req.params.id);
console.log(app.routes);
});

app.use(express.static(__dirname + '/public'));
io.sockets.on('connection', function (socket) { 

    console.log("Socket--id  =>"+socket.id);
    clientNumber = assignClientName(socket, clientNumber,nickNames, namesUsed); 
    console.log("Name created");
    //username=getUserName();
    roomname=joinRoom(socket, "syslog"); 
  
    handleMessageBroadcasting(socket,nickNames); 
    handleRoomJoining(socket);

    socket.on('rooms', function() { 
      socket.emit('rooms', io.sockets.manager.rooms);
    });

    handleClientDisconnection(socket, nickNames, namesUsed); 
  });





/*function getUserName(){
  console.log("getmethod");
app.use(function(req, res, next){
                    console.log("user name ");
                     user="";
                      user=s.reverse(req.url);
                       n=user.length;
                       for(i=0;user[i].indexOf('/');i++)
                        {
                         p_user+=user[i];
                          }
                          p_user=s.reverse(p_user);
                         console.log("new user"+p_user);
                return p_user;
});
}*/

function assignClientName(socket, clientNumber, nickNames, namesUsed) {
  var name = 'Client' + clientNumber; 
  console.log(name);
  nickNames[socket.id] = name;   
  console.log("Nick Names ===>"+nickNames[socket.id])
  return clientNumber + 1; 
  //return nicknames
}


function joinRoom(socket, room) {
  console.log("joining");
  socket.join(room); 
  currentRoom[socket.id] = room; 
console.log("joining");
console.log(room);
 return currentRoom[socket.id];
 }


function handleMessageBroadcasting(socket,nickNames) {
   console.log("message broadcast"+nickNames[socket.id]);
  db.on('message', function (channel,message) {
    console.log("message broadcast1");
    //socket.broadcast.to(message.room).emit("message",message);
    
    socket.broadcast.to(nickNames[socket.id]).emit('message',message);
    });console.log("message broadcast");

}



function handleRoomJoining(socket) {
  socket.on('join', function(room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  });
}



function handleClientDisconnection(socket) {
  socket.on('disconnect', function() {
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  });
}

