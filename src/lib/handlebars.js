const i18n = require("../lib/i18n");
const { format } = require("timeago.js");

const helpers = {
    timeago: function (timestamp) {
        return format(timestamp);
    },
    __: function () {
        return i18n.__.apply(this, arguments);
    },
    __n: function () {
        return i18n.__n.apply(this, arguments);
    },
};

module.exports = helpers;
