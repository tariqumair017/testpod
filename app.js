import express from "express";
import path from "path";
import ejsMate from "ejs-mate";
import "express-async-errors";
import fileUpload from "express-fileupload";
import flash from "connect-flash";
import connectdb from "./db.js";
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import helmet from "helmet";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import Admin from "./models/admin.js";
import User from "./models/user.js";
const app = express();


//Requring Admin Routes
import AdminIndexRoutes from "./routes/admin/index.js";
import AdminGuessCountryGameRoutes from "./routes/admin/guessCountryGame.js";
import AdminTestRoutes from "./routes/admin/test.js";
import AdminDrawFlagGameRoutes from "./routes/admin/drawFlagGame.js";
import AdminNewFlagRoutes from "./routes/admin/newFlag.js";
import AdminGuessFlagGameRoutes from './routes/admin/guessFlagGame.js';
import AdminFlagDetectiveGameRoutes from './routes/admin/flagDetectiveGame.js';
import AdminWebAnalyticsRoutes from './routes/admin/webAnalytics.js';
import AdminFlagPuzzleGameRoutes from './routes/admin/flagPuzzleGame.js';
import AdminFlagQuestGameRoutes from './routes/admin/flagQuestGame.js';
import AdminUserManagementRoutes from './routes/admin/userManagement.js';
import AdminBlogManagementRoutes from './routes/admin/blogManagement.js';
import AdminPodAdventureRoutes from './routes/admin/podAdventure.js';
 
//Requring Client Routes
import ClientIndexRoutes from "./routes/client/index.js";
import ClientGuessCountryGameRoutes from "./routes/client/guessCountryGame.js";
import ClientTestRoutes from "./routes/client/test.js";
import ClientDrawFlagGameRoutes from "./routes/client/drawFlagGame.js";
import ClientGuessFlagGameRoutes from './routes/client/guessFlagGame.js';
import ClientFlagDetectiveGameRoutes from './routes/client/flagDetectiveGame.js';
import ClientLearnFlagGameRoutes from './routes/client/learnFlagGame.js';
import ClientFlagPuzzleGameRoutes from './routes/client/flagPuzzleGame.js';
import ClientFlagQuestGameRoutes from './routes/client/flagQuestGame.js';
import UserManagementRoutes from "./routes/client/userManagement.js";
import ClientPodAdtentureRoutes from "./routes/client/podAdventure.js"

//Database Connection
connectdb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(flash());
// app.use(helmet());

// PASSPORT CONFIGURATION
app.use(session({
    secret: "This is My UXH First project with the name testpod",
    resave: false,
    saveUninitialized: true,
    // cookie: { 
    //     httpOnly: true,
    //     expires: Date.now() + 60 * 60 * 1000,
    //     maxAge: 60 * 60 * 1000 
    // }
}));

app.use(passport.initialize());
app.use(passport.session());
//Authentication For Admin 
passport.use("admin", new LocalStrategy(Admin.authenticate()));
// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());
//Authentication For User 
passport.use("user", new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, user);
    });
});
passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    });
});


// Server cache clear
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

// Local Storage variables
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.newResultIDForGame = req.session.newResultIDForGame;
    res.locals.newResultIDForQuiz = req.session.newResultIDForQuiz;
    next();
});

//Using Admin Routes
app.use(AdminIndexRoutes);
app.use("/admin/guess-country-game", AdminGuessCountryGameRoutes);
app.use("/admin/test", AdminTestRoutes);
app.use("/admin/draw-flag-game", AdminDrawFlagGameRoutes);
app.use("/admin/draw-flag-game/add-new-flag", AdminNewFlagRoutes);
app.use("/admin/guess-flag-game", AdminGuessFlagGameRoutes);
app.use("/admin/flag-detective-game", AdminFlagDetectiveGameRoutes);
app.use("/admin/web-analytics", AdminWebAnalyticsRoutes);
app.use("/admin/flag-puzzle-game", AdminFlagPuzzleGameRoutes);
app.use("/admin/flag-quest-game", AdminFlagQuestGameRoutes);
app.use("/admin/user-management", AdminUserManagementRoutes);
app.use("/admin/blog-management", AdminBlogManagementRoutes);
app.use("/admin/pod-adventure", AdminPodAdventureRoutes);

//Using Client Routes
app.use(ClientIndexRoutes);
app.use(ClientGuessCountryGameRoutes);
app.use(ClientTestRoutes);
app.use(ClientDrawFlagGameRoutes);
app.use(ClientGuessFlagGameRoutes);
app.use(ClientFlagDetectiveGameRoutes);
app.use(ClientLearnFlagGameRoutes);
app.use(ClientFlagPuzzleGameRoutes);
app.use(ClientFlagQuestGameRoutes);
app.use(UserManagementRoutes);
app.use(ClientPodAdtentureRoutes)


app.all('*', (req, res, next) => {
    res.status(404).send("Page Not Found");
});

//Listen request
const port = process.env.PORT || 9898;
app.listen(port, () => {
    console.log(`Server has started at http://127.0.0.1:${port}`);
});