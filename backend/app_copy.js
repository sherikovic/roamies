const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/elementsDB');
const db = mongoose.connection;
db.on('error', (err) => { console.error("Connection error:", err) });
db.once('open', () => { console.log("Database connected"); });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(session({
    secret: 'thisisasecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    // we don't have to do password
    // since it defaults to "password" as well
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    // this is to authenticate users
    async (username, password, done) => {
        const user = await User.findOne({ email: username });
        if (user === null) {
            return done(null, false, { message: "Could not find user with this email!" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Password incorrect!" })
            }
        } catch (e) {
            return done(e)
        }
    }
));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, User.findById(id)));


app.use('/elements', require('./routes/elements'));
app.use('/auth', require('./routes/users'));
app.listen(8080, () => {
    console.log('Serving on Port 8080');
});
