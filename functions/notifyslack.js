var https = require("https");
var querystring = require('querystring');

exports.handler = function(event, context, callback) {
    var body = JSON.parse(event.body);

    if(body != null && body.data != null){
        var data = body.data;
        var message = `${data.name}(${data.email}): ${data.message}`;

        var postData = JSON.stringify({
            text: message
        });

        var options = {
            hostname: 'www.hooks.slack.com',
            path: '/services/T0253KADL/BAB9445T5/IWjaMiSOjHIdf8tvq2D9oGPe',
            method: 'POST',
            headers: {        
                'Content-Type': 'application/json'
            }
        };
    
        var req = https.request(options, function(res) {
            console.log('STATUS:', res.statusCode);
            console.log('HEADERS:', JSON.stringify(res.headers));
            
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
        
        req.on('error', function (e) {
            console.log('Problem with request:', e.message);
        });

        req.write(postData);
        req.end();    
    }
}