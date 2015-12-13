### tumblr-oauth-example

Example app for requesting OAuth 1.0A access tokens for the [Tumblr API](https://www.tumblr.com/api).
Tokens received can be easily used in the [tumblr.js](https://github.com/tumblr/tumblr.js) library.
Should also be a good skeleton for authenticating with
other endpoints.

### Installation and Usage

Clone repository

    git clone https://github.com/stigok/tumblr-oauth-example.git
    cd tumblr-oauth-example

Install dependencies

    npm i

Edit [`keys.sample.json`](./keys.sample.json) with your app consumer key and secret, and save it as `keys.json`. If you don't have these, you can register to use the Tumblr API at https://www.tumblr.com/oauth/apps.

Open http://localhost:3000 to start token request process.

### Attributions
  Example code helped a lot https://github.com/ciaranj/node-oauth
