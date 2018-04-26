const fs = require('fs')

fs.writeFileSync('./.env', `netlify_access_token=${process.env.netlify_access_token}\n`);
fs.writeFileSync('./.env', `slack_webhook_url=${slack_webhook_url}`);
