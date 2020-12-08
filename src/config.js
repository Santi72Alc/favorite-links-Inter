/* 
HEROKU confiuration

CLEARDB_DATABASE_URL: 
    Host: eu-cdbr-west-03.cleardb.net
    User: b051a52217a284
    Root: 520fbacf
    DB:   heroku_6781bd3fe4580a9
*/

module.exports = {
    appInfo: {
        name: "Favorite Links",
        background: "link-background-img.webp",
        logo: "/img/logo.webp",
    },
    server: {
        host: "localhost",
        port: process.env.PORT || 4000,
    },
    database: {
        host: "eu-cdbr-west-03.cleardb.net",
        port: "3306",
        user: "b051a52217a284",
        password: "520fbacf",
        database: "heroku_6781bd3fe4580a9",
    },
    auth: {
        secret_text: "EsteEsElTextoParaCodificarClaves",
    },
};
