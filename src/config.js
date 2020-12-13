const path = require("path");
const environtment = require("dotenv");

environtment.config({
    path: path.resolve(__dirname, ".env"),
});

const LANGUAGES = ["en", "es"];

const langENV = LANGUAGES.includes(process.env.APP_LANGUAGE.toLowerCase())
    ? process.env.APP_LANGUAGE.toLowerCase()
    : LANGUAGES[0];

module.exports = {
    LANGUAGES,
    appInfo: {
        name: "Favorite Links",
        background: "link-background-img.webp",
        logo: "/img/logo.webp",
        language: langENV,
    },
    server: {
        host: process.env.SERVER || "localhost",
        port: process.env.PORT || 4000,
    },
    database: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "3306",
        user: process.env.DB_USER || "admin_user_name",
        password: process.env.DB_PASSWORD || "user_pass",
        database: process.env.DB_NAME || "database_links",
    },
    auth: {
        secret_text: "EsteEsElTextoParaCodificarClaves",
    },
};
