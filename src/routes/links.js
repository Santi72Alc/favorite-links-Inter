const { Router } = require("express");
const router = Router();

const i18n = require("../lib/i18n");
const { isLoggedIn } = require("../lib/auth");

const pool = require("../database");

const URL_BASE = "/links";
const URL_VIEWS = "links";

/* ******************************
    LIST LINKS
****************************** */
router.get("/", isLoggedIn, async (req, res) => {
    const links = await pool.query("SELECT * FROM links WHERE user_id=?", [req.user.id]);
    res.render(URL_VIEWS + "/list", { links });
});

/* ******************************
    ADD LINKS
****************************** */
router.get("/add", isLoggedIn, (req, res) => {
    res.render(URL_VIEWS + "/add");
});

// route to SAVE the new record
router.post("/add", isLoggedIn, async (req, res) => {
    let { title, url, description } = req.body;

    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id,
    };

    try {
        // add the new link record into the table links
        await pool.query("INSERT INTO links SET ?", [newLink]);
        console.log("New record created!!");
        req.flash("success", i18n.__("Saved successfully!!"));
    } catch (error) {
        console.error(i18n.__("Error saving the new record: {{error}}", { error }));
        req.flash("error", i18n.__("Error saving the new record!!"));
    }
    res.redirect(URL_BASE);
});

/* ******************************
    UPDATE LINK
****************************** */
router.get("/edit/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;

    try {
        const records = await pool.query("SELECT * FROM links WHERE id=?", [id]);
        res.render(URL_VIEWS + "/edit", { record: records[0] });
    } catch (error) {
        console.error(i18n.__("Error reading record [{{id}}] to modify: {{error}}", { id, error }));
        req.flash("error", i18n.__("Error reading the record [{{id}}]", { id }));
        res.redirect(URL_BASE);
    }
});

// Route to SAVE the record 'id' modified
router.post("/edit/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    console.log(id);
    const newLink = {
        title,
        url,
        description,
    };
    try {
        await pool.query("UPDATE links SET ? WHERE id=?", [newLink, id]);
        console.log("Record [{{id}}] modified!!", { id });
        req.flash("success", i18n.__("Saved successfully!!"));
    } catch (error) {
        console.error(
            i18n.__("Error updating the record [{{id}}] modified: {{error}}", { id, error })
        );
        req.flash("error", i18n.__("Error updating link!!"));
    }
    res.redirect(URL_BASE);
});

/* ******************************
    DELETE LINK
****************************** */
router.get("/delete/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM links WHERE id=?", [id]);
        console.log("Record [{{id}}] deleted!!", { id });
        req.flash("success", i18n.__("Link deleted successfully!!"));
    } catch (error) {
        console.error(i18n.__("Error deleting link [{{id}}]: {{error}}", { id, error }));
        req.flash("error", i18n.__("Error deleting link!!"));
    }
    res.redirect(URL_BASE);
});

module.exports = router;
