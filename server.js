var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    
    user:'bitsupdates',
    database:'bitsupdates',
    host :'db.imad.hasura.app.io',
    port : '5432',
    password : 'db-bitsupdates-58569',  // user environment variables to keep the password hiddne process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.user(bodyParser.json()); // express framework is informed that when it see JSON type it should go to req.body



var articles = {
    'article-one': {
        title: 'Article One | Naeem Ahsan',
        heading: 'Article One',
        date: 'Aug 9, 2017',
        content: `
         <p>
            This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.
        </p>
         <p>
            This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.
        </p>
         <p>
            This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.
        </p>`
            
        },
    'article-two': {
            title: 'Article Two | Naeem Ahsan',
        heading: 'Article Two',
        date: 'Aug 19, 2017',
        content: `
         <p>
            This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.
        </p>
         <p>
            This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.
        </p>
         <p>
            This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.
        </p>`
            
        },
    'article-three': {
            title: 'Article Three | Naeem Ahsan',
            heading: 'Article Three',
            date: 'Aug 29, 2017',
            content: `
             <p>
                This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.
            </p>
             <p>
                This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.
            </p>
             <p>
                This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.This the first article for the demo pages we are making.This the first article for the demo pages we are making. This the first article for the demo pages we are making. This the first article for the demo pages we are making.
            </p>`
            
        }
};


function createTemplate(data){
        var title= data.title;
        var heading = data.heading;
        var date= data.date;
        var content = data.content;
        var htmlTemplate = `
        <html>
            <head>
                <title>
                    ${title}
                </title>
                
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <hr/>
                    <h3>
                       ${heading}
                    </h3>
                    <div>
                        ${date}
                    </div>0++
                    <div>
                       ${content}
                    </div>
                </div>
            </body>
        </html>
        `;
        return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    // How to create a hash
    // syntax of crypto (input, salt, iterations,keylength,)
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});


//instead of app.get we use app.post to keep the password secure and not logged in browser histroy
app.post('/create-user',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1,$2)', [username, dbString], function(err, result){
       if (err){
                    res.status(500).send(err.toString());
            }else {
                    res.send('User successfully created : ' + username);
            }
   });
});

app.post('/login', function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result){
       if (err){
                    res.status(500).send(err.toString());
            }else {
                if (result.rows.length===0){
                    res.send(403).send('No usernaem or password is invalid');
                }else {
                    var dbString = result.rows[0].password;
                    var salt = dbString.split('$')[2];
                    var hashedPassword = hash(password, salt); // Creating a hash on the password submitted
                    if (hashedPassowrd === dbString){
                        res.send('credentials correct');
                    }else {
                        res.send(400).send('username/password is invalid');
                    }
                }
                    res.send('User successfully created : ' + username);
            }
   });
    
});
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test', function(err, result){
            if (err){
                    res.status(500).send(err.toString());
            }else {
                    res.send(JSON.stringify(result.rows));
            }
    });
});
var counter = 0;
app.get('/counter',function(req,res){
    counter = counter +1;
    res.send(counter.toString());
});

app.get('/:articleName',function(req,res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names=[];
app.get('/submit-name/:name', function(req,res){
    var name = req.params.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
