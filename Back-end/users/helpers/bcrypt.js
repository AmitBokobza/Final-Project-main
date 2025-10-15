const bcrypt = require("bcrypt");

const generatePassword = async (password) => await bcrypt.hash(password,10);

const comparePassword = (password, hashedPass) => {
    return bcrypt.compareSync(password, hashedPass);
}

module.exports = {generatePassword, comparePassword};