const bcrypt = require('bcrypt');

function check(plain) {
    return bcrypt.compareSync(plain, process.env.APP_TOKEN);
}

module.exports.check = check;
