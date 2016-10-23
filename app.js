// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

app.get('/tricot-tracker', function (req, res, next) {
  res.sendFile(__dirname+'/public/tricotTracker.html');
})

app.get('/button', function (req, res, next) {
  res.sendFile(__dirname+'/public/button.html');
})

var moveCount = 0;

app.post('/move/:number', function (req, res, next) {
  moveCount += parseInt(req.params.number || 1);
  if(moveCount < 0) {
    moveCount = 0;
  }
  io.emit('move', moveCount);
  res.sendStatus(200);
})

app.post('/reset', function (req, res, next) {
  moveCount = 0;
  io.emit('move', moveCount);
  res.sendStatus(200);
})

io.on('connection', function (socket) {
  console.log('connection');
  socket.emit('move', moveCount);
});
