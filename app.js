import express from "express"; 
import bodyParser from 'body-parser'; 
const { json } = bodyParser; 
import path from "path"; 
import ejsMate from "ejs-mate";
import fileUpload from "express-fileupload";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
// import connectEnsureLogin from "connect-ensure-login";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { fileURLToPath } from "url";  
import methodOverride from "method-override";  
import Admin from "./models/admin.js";
const app = express();
const { urlencoded } = bodyParser;
const port = process.env.PORT || 3000;
 

//Requring Routes
import AdminRoutes from "./routes/admin.js"; 
import ClientRoutes from "./routes/client.js"; 
import IndexRoutes from "./routes/index.js"; 
 
//mongoDB Connection with mongoose
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://nadir:salt-water-toffee@dev154.bigfoot.com", { useNewUrlParser: true , useUnifiedTopology: true, dbName: 'testpod'}, () => {
    console.log("Connected to MongoDB");
});
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));
app.use(methodOverride("_method")); 
app.use(express.static(__dirname + "/public")); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(flash());

app.use(session({
    secret: "This is My UXH First project with the name testpod",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async function verify(username, password, done) {   
      
    const user = await Admin.findOne({username: username}); 

    if(user)
    {   
         //------------ Password Matching ------------//
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {console.log(err)};
        if (isMatch) {
            return done(null, user);
        } else {
            console.log("Password incorrect! Please try again"); 
            return done(null, false, {message: "Password incorrect! Please try again"});
        }
      });
    }
    else
    {
        console.log("This User is Not Regictered"); 
        return done(null, false, {message: "This User is Not Regictered"});
    } 
}));
passport.serializeUser(function(user, done) {
    process.nextTick(function() {
        done(null, user);
    });
});  
passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
      return done(null, user);
    });
});

app.use(function(req, res, next){
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(AdminRoutes); 
app.use(ClientRoutes);
app.use(IndexRoutes);

app.use((req, res, next) => {
    // res.status(404).send(`<h2 style="text-align: center; margin-top: 30px"><u>Page Not Found</u></h2>`);
    res.status(404).send("404 Page Not Found");
}); 

// Tell Express to Listen request
app.listen(port, () => {
    console.log(`Server has started at http://localhost:${port}`);
});