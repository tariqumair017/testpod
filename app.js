import express from "express"; 
import bodyParser from 'body-parser'; 
const { json } = bodyParser; 
import path from "path"; 
import ejsMate from "ejs-mate";
// import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
// import LocalStrategy from "passport-local";
// import connectEnsureLogin from "connect-ensure-login";
// import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { fileURLToPath } from "url";  
import methodOverride from "method-override";  
// import User from "./models/user.js";
const app = express();
const { urlencoded } = bodyParser;
const port = process.env.PORT || 3000;

 
//Requring Routes
import AdminRoutes from "./routes/admin.js"; 
import ClientRoutes from "./routes/client.js"; 

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
} 

//mongoDB Connection with mongoose
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/TestPod", options, () => {
    console.log("Connected to MongoDB");
});
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));
app.use(methodOverride("_method")); 
app.use(express.static(__dirname + "/public"));
// app.use(flash());
 
app.use(session({
    secret: "This is My UXH First project with the name testpod",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(async function verify(username, password, done) {   
      
//     const user = await User.findOne({username: username}); 

//     if(user)
//     {   
//          //------------ Password Matching ------------//
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) {console.log(err)};
//         if (isMatch) {
//             return done(null, user);
//         } else {
//             console.log("Password incorrect! Please try again"); 
//             return done(null, false, { message: 'Password incorrect! Please try again' });
//         }
//       });
//     }
//     else
//     {
//         console.log("This User is Not Regictered"); 
//         return done(null, false, { message: 'This User is Not Registered' });
//     } 
// }));
// passport.serializeUser(function(user, done) {
//     process.nextTick(function() {
//         done(null, user);
//     });
// });  
// passport.deserializeUser(function(user, done) {
//     process.nextTick(function() {
//       return done(null, user);
//     });
// });

// app.use(function(req, res, next){
//     res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//     res.locals.currentUser = req.user; 
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });
 

app.use(AdminRoutes); 
app.use(ClientRoutes);

app.use((req, res, next) => {
    // res.status(404).send(`<h2 style="text-align: center; margin-top: 30px"><u>Page Not Found</u></h2>`);
    res.status(404).send("404 Page Not Found");
}); 

// Tell Express to Listen request
app.listen(port, () => {
    console.log(`Server has started at http://localhost:${port}`);
});