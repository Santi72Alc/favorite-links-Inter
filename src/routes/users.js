const express = require("express");
const router = express.Router();
const { locals } = express();
const { isLoggedIn } = require("../lib/auth");
const i18n = require("../lib/i18n");

const pool = require("../database");

const URL_BASE = "/users";
const URL_VIEWS = "users";

router.get("/", (req, res) => {
    console.log("routers users", req.cookies);
    res.redirect("/links");
});

/* ******************************
    PROFILE
****************************** */
router.get("/profile", isLoggedIn, (req, res) => {
    res.render(URL_VIEWS + "/profile");
});

/* ******************************
    DELETE USER
****************************** */
router.get("/delete", isLoggedIn, async (req, res) => {
    res.render(URL_VIEWS + "/confirmDeleteUser");
});

// Route to confirm to delete the user
router.get("/delete/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    try {
        pool.query("DELETE FROM users WHERE id=?", [id]);
        console.log(`User [${id}] deleted!!`);
        req.flash("message", i18n.__("Bye {{user}}. We will miss you...", { user }));
        req.logOut();
        res.redirect("/");
    } catch (error) {
        console.error(`Error deleting user [${id}]: `, error);
        req.flash("error", i18n.__("Error deleting user!!"));
    }
});

module.exports = router;
