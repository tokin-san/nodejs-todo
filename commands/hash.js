const args = process.argv.slice(2);

if (args.length == 0) {
    console.log('[Error] Require plain token for generate hash.');
    return;
}

require('dotenv').config();
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.APP_SALT);
console.log(bcrypt.hashSync(args[0], salt));
