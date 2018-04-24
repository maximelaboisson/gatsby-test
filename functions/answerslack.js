var https = require("https");
var qs = require('querystring')

exports.handler = function(event, context, callback) {
    var json = qs.parse(event.body);

    console.log(json);

    var ans = {
        statusCode: 200,
        replace_original: true,
        text: "The review has been approved!"
    }

    callback(null, qs.stringify(ans));
}