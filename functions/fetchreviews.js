const fetch = require('node-fetch');

exports.handler = function(event, context, callback) {
    var id = event.queryStringParameters.id;
    var token = 'eb34003b40f217432461bc6a272d8b5582ccdf15c14597f12754f3029a55dfbb';

    if(id == undefined){
        callback('A product id must be specified.', {
            statusCode: 500
        })
    }

    fetch(`https://api.netlify.com/api/v1/forms?access_token=${token}`)
        .then(x => x.json())
        .then(x => {
            var form = x.filter(y => y.name == `product-${id}`)[0]

            if(form == null){
                callback('The product id must be valid.')
            }

            fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions?access_token=${token}`)
                .then(x => x.json())
                .then(x => {
                    callback(null, {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin" : "*"
                        },
                        body: JSON.stringify(x)
                    })
                })
        })
}