const fetch = require('node-fetch').config();

exports.handler = function(event, context, callback) {
    var webhook = 'https://hooks.slack.com/services/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';
    
    var message = `${event.body.data.name}(${event.body.data.email}): ${event.body.data.message}`;

    fetch(webhook, {
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
      .then(x => console.log(x));
}