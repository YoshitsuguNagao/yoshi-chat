const express = require('express');

//App setup

const app = express();
const server = app.listen(4000, function() {
  console.log('listening to reqests on port 4000');
})

// Static filrs
app.use(express.static('public'))