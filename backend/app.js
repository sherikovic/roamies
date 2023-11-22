const express = require('express');
const passport = require('passport');

const app = express();
require('./config/mongodb-cfg');
require('./config/express.cfg')(app, passport);
require('./config/passport-cfg')(app, passport);

app.use('/elements', require('./routes/elements'));
app.use('/auth', require('./routes/users'));
