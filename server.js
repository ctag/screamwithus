var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/build/index.html');
// });

var activeUsers = 0
var connectedSockets = {}

io.on('connection', function(socket){
  console.log('a user connected: ', socket.id);
  connectedSockets[socket.id] = false

  socket.on('button pressed', () => {
    if (connectedSockets[socket.id] == false) {
      connectedSockets[socket.id] = true
      activeUsers++
      io.emit('activeUserCount', activeUsers)
    }
  })

  socket.on('button released', () => {
    if (connectedSockets[socket.id] == true) {
      connectedSockets[socket.id] = false
      activeUsers--
      io.emit('activeUserCount', activeUsers)
    }
  })

  socket.on('disconnect', () => {
    console.log("a user disconnected: ", socket.id)
    if (connectedSockets[socket.id] == true) {
      connectedSockets[socket.id] = false
      activeUsers--
      io.emit('activeUserCount', activeUsers)
    }
  })
});

app.use(express.static('build'))

http.listen(3000, function(){
  console.log('listening on *:3000');
});
