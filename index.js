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

if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets
    // like our main.js file , or mais.css file
    app.use(express.static('client/build'));
    // express will serve up the index.html file
    // if it doesn't recognize the route 
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
// options other

// require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000
app.listen(PORT);