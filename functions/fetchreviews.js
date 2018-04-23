const https = require("https");

exports.handler = function(event, context, callback) {
    var id = event.queryStringParameters.id;
    var token = 'eb34003b40f217432461bc6a272d8b5582ccdf15c14597f12754f3029a55dfbb'

    if(!!id){
        callback('A product id must be specified.')
    }

    https.get(`https://api.netlify.com/api/v1/forms?access_token=${token}`, res => {
        res.setEncoding("utf8");
        
        let body = "";
        
        res.on("data", data => {
          body += data;
        });
        
        res.on("end", () => {
          body = JSON.parse(body);
          
          callback(null, {
            statusCode: 200,
            body: body
          });
        });
      });

    /*fetch(`https://api.netlify.com/api/v1/forms?access_token=${token}`)
        .then(x => x.json())
        .then(x => {
            var form = x.filter(y => y.id == id)[0]

            if(form == null){
                callback('The product id must be valid.')
            }

            fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions?access_token=${token}`)
                .then(x => x.json())
                .then(x => callback(null, {
                    statusCode: 200,
                    body: x
                }))
        })*/
}