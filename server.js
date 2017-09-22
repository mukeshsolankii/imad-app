var express = require('express');//these are libraries 
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var config = {
    host: 'db.imad.hasura-app.io',
    user: 'musasurvey1616',
    password: process.env.DB_PASSWORD,
    database: 'musasurvey1616',
    port: '5432'
};

var content ={
  'article-one' : {
       title: 'article-one',
       heading: 'Article One',
       date: '12 sep',
       content: `<p>
					 This is article one. This is article one. This is article one.
					 This is article one. This is article one. This is article one.
					 This is article one. This is article one. This is article one.
				  </p>
				   <p>
					 This is article one. This is article one. This is article one.
					 This is article one. This is article one. This is article one.
					 This is article one. This is article one. This is article one.
				  </p>
				   <p>
					 This is article one. This is article one. This is article one.
					 This is article one. This is article one. This is article one.
					 This is article one. This is article one. This is article one.
				  </p>`
                },
    'article-two' : {
        title: 'article-two',
        heading: 'Article Two',
        date: '12 sep',
        content: `<p>
					 This article two content which is created by mukesh solanki .
					 in 1343 seconds.
				  </p>`
    }            
  
};

function createTemplete (data) {
    var title = data.title;
    var content = data.content;
    var heading = data.heading;
    var date = data.date;
    
     var templete = `<html>
        <head>
        <title>${title}</title>
        </head>
        <body>
         <a href="/">Home</a>
          <hr/>
            <h2>${heading}</h2>
            <p>${date}</p>
            <hr/>
            ${content}
        </body>
        </html>`;
     return  templete;
}



            app.get('/', function (req, res) {
              res.sendFile(path.join(__dirname, 'ui', 'index.html'));
            });
            
            var pool = new Pool(config);
            app.get('/test-db',function(req , res){
                //make a select request ..
                //return the response with the result..
                pool.query('SELECT * FROM test', function(err , result){
                    if(err){
                        res.status(500).send(err.string());
                    }else{
                        res.send(JSON.stringify(result.rows));
                    }
                });
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
                 
                app.get('/:articleName', function (req, res){
                    var articleName = req.params.articleName;
                    res.send(createTemplete(content[articleName]));
                }); 
            
            

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
