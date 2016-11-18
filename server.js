var express = require('express');
var path = require('path');

var mongoose = require('mongoose');
var config = require('./config/appconfiguration.js')
mongoose.connect(config.Db());

var bodyParser = require('body-parser');

var routes = require('./routes/index.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Development')));

app.use('/api', routes)
app.get('/TodoApp', function(req,res){
    res.sendFile('Development/index.html', {root : __dirname })
})

app.listen('3500', function(){
    console.log('Server Started on 3500')
})
