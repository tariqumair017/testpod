import Admin from "../models/admin.js";
import User from "../models/user.js";

let middlewareObj = {};

middlewareObj.isAdminLoggedin = function(req, res, next)
{
    if(req.isAuthenticated())
    { 
        if(req.user && req.user.admin === true)
        {
            return next();
        }
        else
        {
            req.flash("error", "You do not have Permission!");
            return res.redirect("/login");
        }  
    }
    else
    {
        // req.flash("error", "You do not have Permission!");
        return res.redirect("/login");
    }
}

middlewareObj.isUserLoggedin = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        if(req.user && req.user.admin === false)
        {
            if(req.user.blocked == false)
            {
                return next();
            }
            else
            {
                req.logout(function(err) {
                    if (err) { return next(err); }
                    req.flash("error", "Your Account is Blocked!");
                    return res.redirect("/login");
                });
            }
        }
        else
        {
            req.flash("error", "You do not have Permission!");
            return res.redirect("/login");
        }
    }
    else
    {
        req.flash("error", "Please Login!");
        return res.redirect("/login");
    }
}


export default middlewareObj; 