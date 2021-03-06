var express = require('express');
let https = require ('https');
var bodyParser = require('body-parser');  
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname);

app.use(express.static(rootPath));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());  

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening at localhost:3000...");

app.post('/api/translate', function(req, res) {    
    var host = req.body.host;
    var path = req.body.path;
    var key = req.body.key;
    
    let response_handler = function (response) {
        let body = '';

        response.on ('data', function (d) {
            body += d;
        });

        response.on ('end', function () {
            // Regex to get rid of html tags
            let cleanText = body.replace(/<\/?[^>]+(>|$)/g, "");

            console.log (cleanText);
            res.json(cleanText);
        });

        response.on ('error', function (e) {
            console.log ('Error: ' + e.message);
        });
    };

    let Translate = function () {
        let request_params = {
            method : 'GET',
            hostname : host,
            path : path,
            headers : {
                'Ocp-Apim-Subscription-Key' : key
            }
        };

        let request = https.request (request_params, response_handler);
        request.end ();
    }

    Translate ();
});
