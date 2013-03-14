var socket = io.connect('http://localhost/');
            var i=0;
             $(document).ready(function() {
            console.log("start");

            var content = $('#content');

            socket.on('connect', function() {
                  i=i+1;
                 alert("connected-- "+i);

            });
            socket.on('message', function(data){
                  $('#mmm').append($('<li></li>').text(data));
            }) ;

            socket.on('disconnect', function() {
                console.log('disconnected');
                content.html("<b>Disconnected!</b>");
            });
           });

