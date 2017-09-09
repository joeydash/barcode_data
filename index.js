var express = require('express');
var app = express();

var url = require('url');
var request2 = require('request');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    var q = url.parse(request.url, true).query;
    var txt = q.q;
    var result;
    request2.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://openaisearch.com/index.php',
        body:    "URL="+txt
    }, function(err, res, body){
        if (err) {
            console.log(err);
        }else{
            result = body.toString().match(/(https?:\/\/[^\s]+)/g);
            console.log(result)
            var myJSON = JSON.stringify(result);
            response.send(myJSON);
            response.end();
        }
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
