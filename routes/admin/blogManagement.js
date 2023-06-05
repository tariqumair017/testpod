import express, { Router } from "express";
const router = Router(); 
import User from "../../models/user.js";
import asyncHandler from "express-async-handler";   
import middleware from "../../middleware/index.js";


//Admin: Blogs Management Page
router.get("/", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {
    // const data = await User.find({}); 
    res.render("Admin/BlogManagement/BlogManagement", {title: "Blog-Management"});
})); 

//Admin: Blogs Management Page
router.get("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {
    // const data = await User.find({}); 
    res.render("Admin/BlogManagement/AddBlog", {title: "Add-Blog"});
})); 


export default router;