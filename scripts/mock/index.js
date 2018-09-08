const SERVICE_A  = require('./SERVICE_A');
const SERVICE_B  = require('./SERVICE_B');
const Authority  = require('./Authority');

module.exports = {
    ...SERVICE_A,
    ...SERVICE_B,
    ...Authority
};