import express, { Router } from "express";
const router = Router(); 
import User from "../../models/user.js";
import asyncHandler from "express-async-handler";   
import middleware from "../../middleware/index.js";


//Admin: User Management Page
router.get("/user-management", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {
    const data = await User.find({}); 
    res.render("Admin/UserManagement/UserManagement", {title: "User-Management", data});
})); 

//Admin - Destroy User
router.delete("/user-management/delete", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
    try {  
      const { id } = req.body;
      await User.findByIdAndDelete(id);
      console.log("User Deleted Successfully"); 
      req.flash("success", `User Deleted Successfully`);
      res.redirect("/admin/user-management"); 
    } catch (error) {
      return next(error.message);
    }
  }));

export default router;