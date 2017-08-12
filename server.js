var express = require('express');//these are libraries 
var morgan = require('morgan');
var path = require('path');

var articleOne ={
  title: 'article-one',
  content: ` <h1 style="text-align: center;">This is Article One.</h1>
        <hr>
        <p style="text-align: center;">this is my first article on online server .
         so, if i m wrong in some thing then please tell me in  comments.
         <br>thank you!  <a href="/"> Home</a>
        </p>
        <hr>`
};

function createTemplete (data) {
    var title = data.title;
    var content = data.content;
    
 var templete = `<html>
    <head>
    <title>${title}</title>
    </head>
    <body>
        ${content}
    </body>
</html>`;
return  templete;
}

var app = express();
app.use(morgan('combined'));

            app.get('/', function (req, res) {
              res.sendFile(path.join(__dirname, 'ui', 'index.html'));
            });
            
                app.get('/ui/main.js',function (req, res){
                    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
                });
                
                    app.get('/ui/style.css', function (req, res) {
                      res.sendFile(path.join(__dirname, 'ui', 'style.css'));
                    });
                    var counter = 0;
                    app.get('/counter', function(req, res){
                        counter = counter + 1;
                        res.send(counter.toString());
                    });
                    
                    
                    app.get('/ui/madi.png', function (req, res) {
                      res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
                    });
                 
                app.get('/article-one', function (req, res){
                    res.send(createTemplete(articleOne));
                }); 
            
            app.get('/article-two', function(req, res){
                res.send('<h2>Here article-two is sencirely presents to you.</h2>');
            });

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
