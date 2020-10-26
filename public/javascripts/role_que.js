var crypto = require('crypto');

function role_is(txt) {
    var hash = crypto.createHash('sha256').update(txt).digest('hex');
    return hash;
}
module.exports = role_is;