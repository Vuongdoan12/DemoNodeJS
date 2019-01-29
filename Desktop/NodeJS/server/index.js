const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

require('./model/User')
require('./services/passport');

mongoose.connect(keys.mongoURI);

const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());

app.use(passport.session());

authRoutes(app);
// options other

// require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000
app.listen(PORT);