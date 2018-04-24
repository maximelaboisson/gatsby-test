var https = require("https");
var qs = require('querystring')

exports.handler = function(event, context, callback) {
    var json = qs.parse(event.body);

    console.log(json);

    var postData  = JSON.stringify({
        replace_original: false,
        text: "The review has been approved!"
    });

    var options = {
        hostname: event.response_url,
        port: 443,
        method: 'POST',
        headers: {        
            'Content-Type': 'application/json'
        }
    };

    var req = https.request(options, function(res) {

        res.setEncoding('utf8');
        
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

    callback(null, {
        statusCode: 200
    })    


}