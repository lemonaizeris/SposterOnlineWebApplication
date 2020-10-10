const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);


// Routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) console.log(err);
      if (!user) res.send("Username or password is wrong.");
      else {
          console.log("LOGGED IN!");
          req.logIn(user, (err) => {
              if (err) console.log(err);
              res.send('True');
              console.log(req.body.username);
          })
      }
    })(req, res, next);
});
app.post("/calculate", (req, res) => {
    console.log(parseInt(req.body.a) + parseInt(req.body.b));
    var sumResult = parseInt(req.body.a) + parseInt(req.body.b);
    res.send(sumResult.toString());
    console.log(req.body);
});
app.get('/logout', (req, res) => {
    req.logOut();
    res.end();
})


// Start Server
app.listen(4000, () => {
    console.log('Server has started.');
})