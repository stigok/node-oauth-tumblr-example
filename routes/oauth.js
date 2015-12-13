const express = require('express');
const router = new express.Router();
const util = require('util');
const OAuth = require('oauth').OAuth;
const keys = require('../keys.json');

const appConsumerKey = keys.tumblr.consumerKey;
const appConsumerSecret = keys.tumblr.consumerSecret;

// Used for testing an API call with aquired token and secret
const protectedResourceUrl = 'https://api.tumblr.com/v2/blog/developers.tumblr.com/info';

// Tumblr endpoints
const authorizeUrl = 'https://www.tumblr.com/oauth/authorize';
const requestTokenUrl = 'https://www.tumblr.com/oauth/request_token';
const accessTokenUrl = 'https://www.tumblr.com/oauth/access_token';

// OAuth(requestTokenUrl, accessTokenUrl, consumerKey, consumerSecret, OAuthVersion, callbackUrl, digest)
const oa = new OAuth(
  requestTokenUrl,
  accessTokenUrl,
  appConsumerKey,
  appConsumerSecret,
  '1.0A',
  'http://localhost:3000/callback',
  'HMAC-SHA1'
);

// Debugging
// router.use(function (req, res, next) {
//   console.log('Session information');
//   console.log('\t', req.session);
//   next();
// });

router.get('/callback', function (req, res, next) {
  console.log('Got callback with params', req.query);
  console.log('\tSession values are token,secret', req.session.requestToken, req.session.requestTokenSecret);

  if (!req.session.requestToken || !req.session.requestTokenSecret) {
    console.error('No requestToken or secret found', req.session.requestToken, req.session.requestTokenSecret);
    return next('No requestToken found');
  }

  console.log('Validating received OAuthAccessToken');

  oa.getOAuthAccessToken(
    req.query.oauth_token,
    req.session.requestTokenSecret,
    req.query.oauth_verifier,
    function (err, token, secret) {
      if (err) {
        console.error('Validation failed with error', err);
        return next(err);
      }

      console.log('Testing token by requesting protected resource', protectedResourceUrl);

      oa.get(protectedResourceUrl, token, secret, function (err) {
        if (err) {
          console.error('Test failed with error', err);
          return next(err);
        }

        console.log('Verification successful!');
        console.log('\t', token, secret);

        return res.send(JSON.stringify({
          message: 'You are authorized!',
          token: token,
          secret: secret
        }));
      });
    }
  );
});

router.get('/', function (req, res, next) {
  console.log('Requesting a token and secret...');
  oa.getOAuthRequestToken(function (err, token, secret) {
    if (err) {
      console.error('Failed to get a request token', err);
      return next(err);
    }
    console.log('\t%s : %s', token, secret);

    // Save generated tokens to session
    req.session.requestToken = token;
    req.session.requestTokenSecret = secret;

    let authUrl = authorizeUrl + '?oauth_token=' + token;
    let html = util.format('<a href="%s">%s</a>', authUrl, authUrl);

    console.log('Supplying auth url %s', authUrl);

    return res.status(200).send(html);
  });
});

module.exports = router;
