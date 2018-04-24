var https = require("https");
var qs = require('querystring')

function getURL(href) {
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        href: href,
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    }
}

exports.handler = function(event, context, callback) {
    var json = JSON.parse(qs.parse(event.body).payload);

    console.log(json);

    var answer = json.actions[0].value;

    var endpoint = 'https://api.netlify.com/api/v1/submissions/';
    var access_token = 'eb34003b40f217432461bc6a272d8b5582ccdf15c14597f12754f3029a55dfbb';
    var id = json.original_message.attachments[0].text;
    
    var postData  = JSON.stringify({
        replace_original: true,
        attachments: [{
            text: answer == 'keep'
                ? `The review (${id}) was approoved!`
                : `The review was rejected.`
        }]
    });

    var url = getURL(json.response_url);

    var options = {
        hostname: url.hostname,
        path: url.pathname,
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