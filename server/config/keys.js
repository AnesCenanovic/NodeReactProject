// keys.js

if (process.env.NODE_ENV === 'production') {
    //prod
    module.exports = require('./prod');
} else {
    //dev
    module.exports = require('./dev');
}