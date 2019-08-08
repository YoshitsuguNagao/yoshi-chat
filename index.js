const express = require('express');
const socket = require('socket.io');

//App setup
const app = express();
const server = app.listen(4000, function() {
  console.log('listening to reqests on port 4000');
})

// Static filrs
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', function(socket) {
  console.log('made socket connection', socket.id);

  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  })
});