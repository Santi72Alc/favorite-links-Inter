const express = require("express");
const morgan = require("morgan");
const expHBS = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const { appInfo, database, auth, server } = require("./config");

// Internationalization
const i18n = require("./lib/i18n");

const flash = require("connect-flash");
const session = require("express-session");
const MYSQLStore = require("express-mysql-session");

const passport = require("passport");

// initializations
require("../src/lib/passport");

// settings
app.set("port", server.port);
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    expHBS({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        helpers: require("./lib/handlebars"),
    })
);
app.set("view engine", ".hbs");

// middlewares
app.use(cookieParser());
app.use(
    session({
        secret: auth.secret_text,
        resave: false,
        saveUninitialized: false,
        store: new MYSQLStore(database),
    })
);
app.use(i18n.init);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.locals.appInfo = appInfo;
app.use((req, res, next) => {
    // TODO  ver porque se vuelve a ingles cuando se guarda la cookie en expañol
    // const { FL_lang } = req.cookies;
    app.locals.success = req.flash("success");
    app.locals.message = req.flash("message");
    app.locals.error = req.flash("error");
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/users", require("./routes/users"));
app.use("/links", require("./routes/links"));

// Public
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
app.listen(app.get("port"), () => {
    console.log("Server listening on port {{port}}", { port: app.get("port") });
    console.log(
        i18n.__("You can try it, press <Ctrl+Click> on http://{{server}}:{{port}}", {
            server: server.host,
            port: app.get("port"),
        })
    );
});
