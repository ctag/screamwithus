var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/build/index.html');
// });

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log("a user disconnected.")
  })
});

app.use(express.static('build'))

http.listen(3000, function(){
  console.log('listening on *:3000');
});
