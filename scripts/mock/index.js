const SERVICE_A = require('./SERVICE_A');
const SERVICE_B = require('./SERVICE_B');

module.exports = {
    ...SERVICE_A,
    ...SERVICE_B
};