const express = require('express');
const router = new express.Router();
const util = require('util');
const OAuth = require('oauth').OAuth;
const keys = require('../keys.json');

const consumerKey = keys.tumblr.consumerKey;
const consumerSecret = keys.tumblr.consumerSecret;
const callbackUrl = 'http://localhost:4000/callback';
const protectedResourceUrl = 'https://api.tumblr.com/v2/blog/developers.tumblr.com/info';

const authorizeUrl = 'https://www.tumblr.com/oauth/authorize';
const requestTokenUrl = 'https://www.tumblr.com/oauth/request_token';
const accessTokenUrl = 'https://www.tumblr.com/oauth/access_token';

const oa = new OAuth(
  requestTokenUrl,
  accessTokenUrl,
  consumerKey,
  consumerSecret,
  '1.0A',
  callbackUrl,
  'HMAC-SHA1'
);

function validateTokens(accessToken, accessTokenSecret, cb) {
  oa.get(protectedResourceUrl, accessToken, accessTokenSecret, function (err, data) {
    if (err) {
      return cb('Tokens are invalid');
    }

    let d = JSON.parse(data);
    console.log('data', data);
    console.log('parsed', d);

    return cb(null);
  });
}

router.use('/callback', function (req, res, next) {
  console.log('session obj', util.inspect(req.session));

  oa.getOAuthAccessToken(
    req.query.oauth_token,
    req.session.authTokenSecret,
    req.query.oauth_verifier,
    function (err, token, secret, result) {
      if (err) {
        console.error('Token mismatch for authToken', token);
        return next('Token mismatch');
      }

      validateTokens(token, secret, function (err) {
        if (err) {
          console.error(err);
          return next(err);
        }

        console.log(result);
        return res.send('You are authorized!');
      });
    }
  );
});

router.use('/', function (req, res, next) {
  console.log('session obj', util.inspect(req.session));

  oa.getOAuthRequestToken(function (err, token, secret) {
    if (err) {
      console.error('Failed to get a request token', err);
      return next(err);
    }

    req.session.authToken = token;
    req.session.authTokenSecret = secret;

    let authUrl = authorizeUrl + '?oauth_token=' + token;
    let html = util.format('<a href="%s">%s</a>', authUrl, authUrl);

    return res.status(200).send(html);
  });
});

module.exports = router;
