var crypto = require('crypto');

function passhash(txt) {
    var hash = crypto.createHash('sha256').update(txt).digest('hex');
    return hash;
}
module.exports = passhash;