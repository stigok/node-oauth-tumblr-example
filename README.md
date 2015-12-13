### node-oauth-tumblr-example

Node.js web app for requesting OAuth 1.0A access tokens for the [Tumblr API](https://www.tumblr.com/api).
Tokens aquired can e.g. be used with the [tumblr.js](https://github.com/tumblr/tumblr.js) library.
Could also be a skeleton for authenticating with other endpoints.

### Usage

##### Clone repository

    git clone https://github.com/stigok/node-oauth-tumblr-example.git --depth=1
    cd node-oauth-tumblr-example

##### Install dependencies

    npm i

##### Configure API keys

Rename [`keys.sample.json`](./keys.sample.json) to `keys.json` and update with your OAuth consumer key and secret. If you don't have these you can register at https://www.tumblr.com/oauth/apps. Set the *default callback url* to `http://localhost:3000/callback` when creating the application.

##### Start server

    npm start

Open http://localhost:3000 to start token request process. Writes debug information to node console.

### Attributions
- OAuth wrapper for NodeJS
  - https://github.com/ciaranj/node-oauth

### License
See [./LICENSE](./LICENSE)
