import Admin from "../models/admin.js";
import User from "../models/user.js";

let middlewareObj = {};

middlewareObj.isAdminLoggedin = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        Admin.findById(req.user._id, (err, admin) => {
            if(err)
            {
                console.log(err);
            }
            else
            { 
                if(admin)
                {
                    return next();
                }
                else
                {
                    req.flash("error", "You do not have Permission!");
                    return res.redirect("/login");
                }
            }
        });
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
        User.findById(req.user._id, (err, user) => {
            if(err)
            {
                console.log(err);
            }
            else
            { 
                if(user)
                {
                    return next();
                }
                else
                {
                    req.flash("error", "You do not have Permission!");
                    return res.redirect("/login");
                }
            }
        });
    }
    else
    {
        req.flash("error", "Please Login!");
        return res.redirect("/login");
    }
}


export default middlewareObj; 