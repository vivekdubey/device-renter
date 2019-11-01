var express = require('express');
var app = express();
const { port, cookieMaxAge } = require('./config');

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: cookieMaxAge }
}));

require('./passport/passport')(app);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const devicesRouter = require('./routes/devices');
app.use('/devices', devicesRouter);



console.log(`port: ${port}`)
app.listen(port);
