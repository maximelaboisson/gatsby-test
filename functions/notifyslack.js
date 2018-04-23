//const fetch = require('node-fetch').config();

var http = require("http");

exports.handler = function(event, context, callback) {
    var webhook = 'https://hooks.slack.com/services/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';
    
    var body = JSON.parse(event.body);

    if(body != null && body.data != null){

        console.log(`DATA IS: ${body.data}`)

        var data = body.data;
        var message = `${data.name}(${data.email}): ${data.message}`;

        var options = {
            hostname: 'https://hooks.slack.com/services/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',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin" : "*"
            }
        };
    
        var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (body) {
                console.log('Body: ' + body);
            });
        });
    
        req.write(`{"string": "${message}"}`);
        req.end();    

        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*"
            }
        });
    }

    callback(null, {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        }
    });
}