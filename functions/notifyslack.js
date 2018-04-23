//const fetch = require('node-fetch').config();

var http = require("http");

exports.handler = function(event, context, callback) {
    var webhook = 'https://hooks.slack.com/services/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';
    
    var body = JSON.parse(event.body);
    var data = body.message;

    console.log(data);
    console.log(body);

    var message = `${data.name}(${data.email}): ${data.message}`;

    var options = {
        hostname: 'https://hooks.slack.com',
        port: 443,
        path: '/services/T0253KADL/BAB9445T5/IWjaMiSOjHIdf8tvq2D9oGPe',
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

    /*fetch(webhook, {
        body: JSON.stringify(message),
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json',
          "Access-Control-Allow-Origin" : "*"
        },
        method: 'POST',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
      .then(response => response.json())
      .then(x => console.log(x));*/
}