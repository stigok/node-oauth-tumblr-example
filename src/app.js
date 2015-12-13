const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'CHANGE_THIS_SECRET (if you want to)',
  resave: false,
  saveUninitialized: true
}));

app.use('/', require('./routes/oauth'));

// catch-all error handler
app.use(function (err, req, res, next) {
  // If there are no errors here, it must be 404
  if (!err) {
    err = new Error('Not found');
    res.status = 404;
  }

  res.status(err.status || 500);
  return res.send(JSON.stringify(err, null, 2));
});

app.listen(3000, function (err) {
  if (err) {
    throw err;
  }

  console.log('Listening on http://localhost:3000');
});
