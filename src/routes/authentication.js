const { Router } = require("express");
const router = Router();

const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

const URL_BASE_SIGNUP = "/signup";
const URL_BASE_SIGNIN = "/signin";
const URL_VIEWS = "auth";

/* ******************************
    SIGNUP
****************************** */
// Form for new User data
router.get("/signup", isNotLoggedIn, (req, res) => {
    res.render(URL_VIEWS + "/signup");
});

// SignUp the new user
router.post(
    "/signup",
    isNotLoggedIn,
    passport.authenticate("local.signup", {
        successRedirect: "/users/profile",
        failureRedirect: URL_BASE_SIGNUP,
        failureFlash: true,
    })
);

/* ******************************
    SIGNIN
****************************** */
// Form for login
router.get("/signin", isNotLoggedIn, (req, res) => {
    res.render(URL_VIEWS + "/signin");
});

// Login user
router.post("/signin", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local.signin", {
        successRedirect: "/links",
        failureRedirect: URL_BASE_SIGNIN,
        failureFlash: true,
    })(req, res, next);
});

/* ******************************
    LOGOUT
****************************** */
router.get("/logout", isLoggedIn, (req, res) => {
    res.clearCookie("FL_lang");
    res.req.logOut();
    res.redirect("/");
});

module.exports = router;
