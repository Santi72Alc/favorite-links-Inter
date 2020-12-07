const { Router } = require("express");
const router = Router();

const { isLoggedIn } = require("../lib/auth");

const pool = require("../database");

const URL_BASE = "/users";
const URL_VIEWS = "users";

router.get("/", (req, res) => {
    res.redirect("/");
});

// Route to ask for delete user
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
        req.flash("message", `Bye ${user.username}. We will miss you...`);
        req.logOut();
        res.redirect("/");
    } catch (error) {
        console.error(`Error deleting user [${id}]: `, error);
        req.flash("error", "Error deleting user!!");
    }
});

module.exports = router;
