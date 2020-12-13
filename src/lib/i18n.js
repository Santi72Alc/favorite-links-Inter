const path = require("path");
const { appInfo, LANGUAGES } = require("../config");
const i18n = require("i18n");

i18n.configure({
    locales: LANGUAGES,
    directory: path.join(__dirname, "../public", "langs"),
    defaultLocale: appInfo.language,
    // header: "accept-language",
    queryParameter: "lang",
    cookie: "FL_lang",
    autoReload: true,
    syncFiles: true,
    register: global,
});

i18n.setLocale(appInfo.language);

module.exports = i18n;
