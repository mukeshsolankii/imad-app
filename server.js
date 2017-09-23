var express = require('express');//these are libraries 
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

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
            
            function hash (input , salt){ //this function appends the value of salt to the input password to make it more secret....
                var hashed = crypto.pbkdf2Sync(input , salt , 10000 , 512 , 'sha512');
                return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');//crypto is a library used to node in which password.based.key.deribation.function.2.Syncronyzed = function is used to hashed the password ... 
            }
            
            app.get('/hash/:input',function(req , res){
                var hashedstring = hash(req.params.input , 'random-salt');
                res.send(hashedstring);
            });
            
            app.get('/login/:username/:password',function(req , res){
                var username = req.params.username;
                var password = req.params.password;
                
                pool.query('select * from "user" where username = $1', [username] , function(err , result){
                    if(err){
                        res.status(500).send(err.toString());
                    }else {
                        if(result.rows.length === 0){
                            res.status(403).send('forbidden!!');
                        }else{
                            var dbstring = result.rows[0].password;
                            var salt = dbstring.split('$')[2];
                            var hashedpassword = hash(password , salt);
                            if(hashedpassword === dbstring){
                                res.status(200).send('welcome');
                                 res.send( username+'  Welcome. you are loged in');
                            }else{
                                res.status(403).send('incorrect password');
                                res.send('username or password are incorrect!!!');
                            }
                        }
                    }
                });
            });
            
            app.post('/create-user', function(req , res){
                var username = req.body.username;
                var password = req.body.password;
                var salt = crypto.randomBytes(128).toString('hex');
                var dbstring = hash(password , salt);
                pool.query('INSERT INTO "user"  (username,password) VALUES ($1 ,$2)',[username , dbstring], function(err , result){
                    if(err){
                        res.status(500).send(err.toString());
                    }else {
                       res.send('user successfully created!! = '+ username); 
                    }
                });
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
                        res.status(500).send(err.toString());
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
