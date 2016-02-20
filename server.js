var express = require('express');
var app = express();

app.use('/script', express.static(__dirname + '/dist/js'));
app.use('/style', express.static(__dirname + '/dist/css'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));

app.set('view engine', 'jade');

// only route available right now
app.get('/', function (req, res) {
  res.render('index');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('App listening on port :' + port);
});
