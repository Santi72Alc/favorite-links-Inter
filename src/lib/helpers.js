const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

helpers.matchPassword = async (password, savedPassword) => {
    let isMatched = false;
    try {
        isMatched = await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.error(error);
    }
    return isMatched;
};

module.exports = helpers;
