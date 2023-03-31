import express from "express"; 
import path from "path"; 
import ejsMate from "ejs-mate";
import fileUpload from "express-fileupload";
import flash from "connect-flash";
import * as dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";  
import mongoose from "mongoose";
import { fileURLToPath } from "url";  
import methodOverride from "method-override";  
import Admin from "./models/admin.js";
const app = express(); 
const port = process.env.PORT || 9898;  

//Requring Routes
import AdminRoutes from "./routes/admin.js"; 
import ClientRoutes from "./routes/client.js"; 
import SelectCountryFlagGameRoutes from "./routes/selectCountryFlagGame.js"; 
import QuizRoutes from "./routes/quiz.js"; 
import DrawNewFlagRoutes from "./routes/drawNewFlag.js"; 
import DrawFlagGameRoutes from "./routes/drawFlagGame.js"; 
import GuessFlagGameRoutes from './routes/guessFlag.js';
import FlagDetectiveRoutes from './routes/flagDetective.js';
 
//mongoDB Connection
mongoose.set("strictQuery", false);
// mongoose.connect("mongodb://nadir:salt-water-toffee@dev154.bigfoot.com", { useNewUrlParser: true , useUnifiedTopology: true, dbName: 'testpod'}, () => {
//     console.log("Connected to MongoDB");
// });
mongoose.connect(process.env.Mongo_Url, { useNewUrlParser: true , useUnifiedTopology: true, dbName: 'testpod'}, () => {
    console.log("Connected to MongoDB");
});

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


// PASSPORT CONFIGURATION
app.use(session({
    secret: "This is My UXH First project with the name testpod",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        expires: Date.now() + 60 * 60 * 1000,
        maxAge: 60 * 60 * 1000 
    }
}));

//For Admin
app.use(passport.initialize());
app.use(passport.session());
passport.use("admin", new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


// Server cache clear
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

// Local Storage variables
app.use(function(req, res, next){
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.newResultIDForGame = req.session.newResultIDForGame;
    res.locals.newResultIDForQuiz = req.session.newResultIDForQuiz;
    next();
});

app.use(AdminRoutes); 
app.use(ClientRoutes);
app.use(SelectCountryFlagGameRoutes);
app.use(QuizRoutes);
app.use(DrawNewFlagRoutes);
app.use(DrawFlagGameRoutes);
app.use(GuessFlagGameRoutes);
app.use(FlagDetectiveRoutes);

app.all('*', (req, res, next) => {
    res.status(404).send("Page Not Found");
}); 

// Tell Express to Listen request
app.listen(port, () => {
    console.log(`Server has started at http://localhost:${port}`);
});