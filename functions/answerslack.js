var https = require("https");
var qs = require('querystring')

exports.handler = function(event, context, callback) {
    var json = qs.parse(event.body);

    console.log(json);

    callback(null, {
        statusCode: 200,
        response_type: "ephemeral",
        replace_original: true,
        text: "The review has been approved!"
    });
}