var express = require('express');
var app = express();

app.use('/script', express.static(__dirname + '/dist/js'));
app.use('/style', express.static(__dirname + '/dist/css'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 8081;

app.listen(port, function() {
  console.log('App listening on port :' + port);
});
