    console.log("start");
            var socket = io.connect('http://localhost/');
            var content = $('#content');

            socket.on('connect', function() {
                 alert("connected");

            });
            socket.on('message', function(roomname,data){
                  $('#mmm').append($('<li></li>').text(data));
            }) ;

            socket.on('disconnect', function() {
                console.log('disconnected');
                content.html("<b>Disconnected!</b>");
            });
