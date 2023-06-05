import express, { Router } from "express";
const router = Router(); 
import User from "../../models/user.js";
import asyncHandler from "express-async-handler";   
import middleware from "../../middleware/index.js";


//Admin: User Management Page
router.get("/", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {
    const data = await User.find({}); 
    res.render("Admin/UserManagement/UserManagement", {title: "User-Management", data});
})); 

//Admin - Destroy User
router.delete("/delete", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
    try {  
      const { id } = req.body;
      await User.findByIdAndDelete(id);
      console.log("User Deleted Successfully"); 
      req.flash("success", `User Deleted Successfully`); 
      res.redirect("/admin/user-management"); 
    } catch (error) {
      req.flash("error", error.message);
      return res.redirect("/admin/user-management"); 
    }
}));

//Admin: Update User
router.put("/edit/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {   
  try {
    const { id } = req.params;  
    await User.findByIdAndUpdate(id, {...req.body.data});
    console.log("User Updated");
    req.flash("success", "User Updated Successfully");
    res.redirect("/admin/user-management");
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/admin/user-management"); 
  }
}));

//Admin: Block/UnBlock User 
router.put("/block", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {   
  try {
    const { id } = req.body;  
    const user = await User.findById(id); 
    if(user.blocked)
    {
      user.blocked = false;
    }
    else
    {
      user.blocked = true;
    }
    await user.save(); 
    req.flash("success", `User ${user.blocked ? 'Blocked': 'Unblocked'} Successfully`);
    res.redirect("/admin/user-management");
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/admin/user-management"); 
  }
}));



export default router;