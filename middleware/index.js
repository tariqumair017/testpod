import Admin from "../models/admin.js";

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
        req.flash("error", "You do not have Permission!");
        return res.redirect("/login");
    }
}

export default middlewareObj; 