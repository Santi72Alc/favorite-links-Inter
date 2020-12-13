const { Router } = require("express");
const { LANGUAGES } = require("../config");
const router = Router();

const i18n = require("../lib/i18n");

/* ******************************
    MAIN ROUTE - INDEX
****************************** */
router.get("/", (req, res) => {
    res.render("index");
});

/* ******************************
    SELECT LANGUAGE
    query  ?lang=[es|en]
****************************** */
router.get("/lang", (req, res) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const { lang } = req.query;
    const backUrl = req.header("Referer") || "/signin";
    if (LANGUAGES.includes(lang)) {
        i18n.setLocale(lang);
        res.cookie("FL_lang", lang, {
            expires: new Date(Date.now() + oneDay),
        });
    }
    res.redirect(backUrl);
});

module.exports = router;
