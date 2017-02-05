var express = require('express');
var path = require('path');

var app = express();

// app.use('/script', express.static(__dirname + '/dist/js'));
// app.use('/style', express.static(__dirname + '/dist/css'));

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('App listening on port :' + port);
});
