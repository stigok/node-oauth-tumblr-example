const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'CHANGE_THIS_SECRET',
  resave: false,
  saveUninitialized: true
}));

app.use('/', require('./routes/oauth'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

http.createServer(app).listen(3000, function (err) {
  if (err) {
    throw err;
  }

  console.log('Listening on http://localhost:3000');
});
