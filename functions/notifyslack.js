var http = require("http");
var querystring = require('querystring');

exports.handler = function(event, context, callback) {
    var body = JSON.parse(event.body);

    if(body != null && body.data != null){
        var data = body.data;
        var message = `${data.name}(${data.email}): ${data.message}`;

        var postData = querystring.stringify({
            text: message
        });

        var options = {
            hostname: 'www.hooks.slack.com',
            path: '/services/T0253KADL/BAB9445T5/IWjaMiSOjHIdf8tvq2D9oGPe',
            method: 'POST',
            headers: {        
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length,
                "Access-Control-Allow-Origin" : "*"
            }
        };
    
        var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            
            res.on('data', function (body) {
                console.log('Body: ' + body);
            });
            
            res.on('end', function () {
                callback(null, {
                    statusCode: 200
                })
            });
        });

        req.write(postData);
        req.end();    
    }
}