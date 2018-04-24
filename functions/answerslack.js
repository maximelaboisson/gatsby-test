var https = require("https");

exports.handler = function(event, context, callback) {
    var ev = JSON.parse(event);
    console.log(ev);
}