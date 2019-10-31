var express = require('express');
var app = express();
const config = require('./config')();

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: config.cookieMaxAge }
}));

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const devicesRouter = require('./routes/devices');
app.use('/devices', devicesRouter);

const port = config.port;
console.log(`port: ${port}`)
app.listen(port);
