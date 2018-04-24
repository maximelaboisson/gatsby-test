const https = require('https');

exports.handler = function(event, context, callback) {
    var id = event.queryStringParameters.id;
    var token = 'eb34003b40f217432461bc6a272d8b5582ccdf15c14597f12754f3029a55dfbb';

    if(id == undefined){
        callback('A product id must be specified.', {
            statusCode: 500
        })
    }

    var options = {
        hostname: 'api.netlify.com/api/v1/',
        port: 443,
        path: '',
        method: 'GET',
        headers: {        
            'Content-Type': 'application/json'
        }
    };

    var queryToken = `access_token=${token}`;
    var opts1 = Object.assign({}, { path: `/forms?${queryToken}`}, options);
    
    var req = https.request(opts1, function(res) {

        res.setEncoding('utf8');
        var body = "";

        res.on("data", (data) => {
            body += data;
        });

        res.on('end', function () {
            body = JSON.parse(body);

            var form = body.filter(x => x.name == `product-${id}`)[0];
            var opts2 = Object.assign({}, { path: `/forms/${form.id}/submissions?${queryToken}`}, options);
            if(form == null){
                callback('The product id must be valid.')
            }

            var req2 = https.request(opts2, function(res2) {
            
                res2.setEncoding('utf8');         
                var body2 = "";

                res2.on("data", (data) => {
                    body2 += data;
                });

                res.on('end', function () {
                    callback(null, {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin" : "*"
                        },
                        body: body2
                    })
                });
            });
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