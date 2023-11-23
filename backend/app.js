const app = require('express')();
const passport = require('passport');

require('./config/mongodb-cfg');
require('./config/express.cfg')(app);
require('./config/passport-cfg')(app, passport);

app.use('/elements', require('./routes/elements'));
app.use('/auth', require('./routes/users'));
