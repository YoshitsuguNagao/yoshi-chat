const express = require('express');
const socket = require('socket.io');
require('dotenv').config();

//App setup
const app = express();

var port = normalizePort(process.env.PORT || '4000');

const server = app.listen(port, function() {
  console.log('listening to reqests on port 4000');
})

// console.log('process.env.PUBLIC_DOMAIN', process.env.PUBLIC_DOMAIN)

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

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  };

  if (port >= 0) {
    // port number
    return port;
  };

  return false;
};