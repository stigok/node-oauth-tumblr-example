### node-oauth-tumblr-example

[Express.js](http://expressjs.com) web application for requesting OAuth 1.0A access tokens for the [Tumblr API](https://www.tumblr.com/api).
Tokens aquired can e.g. be used with the [tumblr.js](https://github.com/tumblr/tumblr.js) library.
Could also be a skeleton for authenticating with other endpoints.

### Usage

Clone repository

    git clone https://github.com/stigok/node-oauth-tumblr-example.git
    cd node-oauth-tumblr-example

Install dependencies

    npm i

Edit [`keys.sample.json`](./keys.sample.json) with your app consumer key and secret, and save it as `keys.json`.
If you don't have these, you can register to use the Tumblr API at https://www.tumblr.com/oauth/apps.
Set the default callback url to `http://localhost:3000/callback` when creating the application.

Open http://localhost:3000 to start token request process. Writes debug information to node console.

### Attributions
Example code helped a lot https://github.com/ciaranj/node-oauth

### License
See [./LICENSE](./LICENSE)
