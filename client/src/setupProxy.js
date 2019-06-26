const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'https://young-ocean-39820.herokuapp.com/'}));
    app.use(proxy('/api/current_user', { target: 'https://young-ocean-39820.herokuapp.com/'}));
    app.use(proxy('/api/logout', { target: 'https://young-ocean-39820.herokuapp.com/'}));
};