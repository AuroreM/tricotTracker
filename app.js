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

app.get('/test', function (req, res, next) {
  res.sendFile(__dirname+'/public/test.html');
})

app.get('/tricot-tracker', function (req, res, next) {
  res.sendFile(__dirname+'/public/tricotTracker.html');
})

var moveCount = 0;

app.post('/move', function (req, res, next) {
  moveCount++;
  io.emit('move', moveCount);
  res.send(200);
})

io.on('connection', function (socket) {
  console.log('connection');
  socket.emit('move', moveCount);
});
