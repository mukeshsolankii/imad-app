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

            app.get('/mohit',function(req , res){
                res.send('mohit is chutia!!!!!!!!!!!!!!?');
            });

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
                    pool.query("SELECT * FROM article WHERE title = '"+articleName+"'",function(err , result){
                        if(err){
                            res.status(500).send(err.toString());
                        }
                        else{
                            if(result.rows.length === 0 ){
                            res.status(404).send('article not found!!');
                            }
                        else{
                                var articledata = result.rows[0];
                                res.send(createTemplete(articledata));
                            }
                       }
                    });    
                }); 
            
            

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
