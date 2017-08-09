var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
                    </div>
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


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
