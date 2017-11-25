var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/',function(req ,res){
   res.sendFile(path.join(__dirname,'ui','index.html'));
});

app.listen(8080,function(){
    console.log('your app is started.');
});