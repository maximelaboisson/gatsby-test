var https = require("https");
var qs = require('querystring')

exports.handler = function(event, context, callback) {
    var json = JSON.parse(qs.parse(event.body).payload);

    var postData  = JSON.stringify({
        replace_original: false,
        text: "The review has been approved!"
    });

    var url = new URL(`www.${json.response_url
        .replace(/(^\w+:|^)\/\//, '')}`);

    var options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {        
            'Content-Type': 'application/json'
        }
    };

    console.log(options);

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