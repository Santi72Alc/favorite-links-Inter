const i18n = require("../lib/i18n");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const { encryptPassword, matchPassword } = require("./helpers");

/* ******************************
    SIGNIN / LOGIN
****************************** */
passport.use(
    "local.signin",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const users = await pool.query("SELECT * FROM users WHERE username=?", [username]);
            if (users.length > 0) {
                // User exist
                const user = users[0];
                const validPassword = await matchPassword(password, user.password);
                if (validPassword) {
                    done(
                        null,
                        user,
                        req.flash("success", i18n.__("Welcome {{username}}", { username }))
                    );
                } else {
                    done(null, false, req.flash("error", i18n.__("Incorrect password")));
                }
            } else {
                // User NOT exist
                done(
                    null,
                    false,
                    req.flash(
                        "error",
                        i18n.__("The Username {{username}} does not exists!", { username })
                    )
                );
            }
        }
    )
);

/* ******************************
    SIGNUP / NEW USER
****************************** */
passport.use(
    "local.signup",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const { fullname } = req.body;
            const newUser = {
                fullname,
                username,
                password,
            };

            // Check if the Username exist.... can't duplicate it
            const users = await pool.query("SELECT * FROM users WHERE username=?", [username]);
            if (users.length > 0) {
                return done(
                    null,
                    false,
                    req.flash(
                        "error",
                        i18n.__("The Username {{username}} has been taken already!", { username })
                    )
                );
            }

            // Save the new user
            newUser.password = await encryptPassword(password);
            const result = await pool.query("INSERT INTO users SET ?", [newUser]);
            newUser.id = result.insertId;
            return done(null, newUser);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const users = await pool.query("SELECT * FROM users WHERE id=?", [id]);
    done(null, users[0]);
});
