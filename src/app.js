var express = require('express');
var app = express();
const { port } = require('./config');

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));

const passport = require("passport");
const {strategy} = require("./passport/github-strategy");

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => { cb(null, user);});
passport.deserializeUser((obj, cb) => { cb(null, obj);});

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const devicesRouter = require('./routes/devices');
app.use('/devices', devicesRouter);



console.log(`port: ${port}`)
app.listen(port);
