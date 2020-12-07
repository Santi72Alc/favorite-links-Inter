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
        host: "localhost",
        port: "3306",
        user: "root",
        password: "Admin_251",
        database: "database_links",
    },
    auth: {
        secret_text: "EsteEsElTextoParaCodificarClaves",
    },
};
