// require('dotenv').config()

// Make connection
const socket = io.connect('https://yoshi-chat-app.herokuapp.com');
// console.log('process.env.PUBLIC_DOMAIN', process.env.PUBLIC_DOMAIN)

// Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener("click", function() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
})

message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value)
})

//Listen for enevt
socket.on('chat', function(data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
})

socket.on('typing', function(data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing message...</em><p>';
})