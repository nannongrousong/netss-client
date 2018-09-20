const Authority_Mgr = require('./Authority_Mgr');
const Sys_Login = require('./SYS_LOGIN');

module.exports = {
    ...Authority_Mgr,
    ...Sys_Login
};