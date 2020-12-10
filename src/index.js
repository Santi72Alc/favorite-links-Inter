const express = require("express");
const morgan = require("morgan");
const expHBS = require("express-handlebars");
const path = require("path");

const { appInfo, database, auth, server } = require("./config");

console.log(database);
console.log(server);

const flash = require("connect-flash");
const session = require("express-session");
const MYSQLStore = require("express-mysql-session");

const passport = require("passport");

// initializations
const app = express();
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
app.use(
    session({
        secret: auth.secret_text,
        resave: false,
        saveUninitialized: false,
        store: new MYSQLStore(session),
    })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.locals.appInfo = appInfo;
app.use((req, res, next) => {
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
    const port = app.get("port");
    console.log(`Server listening at ${server.host} on port ${port}`);
    console.log(`You can try it, press 'Ctrl+Click' on http://${server.host}:${port}`);
});
