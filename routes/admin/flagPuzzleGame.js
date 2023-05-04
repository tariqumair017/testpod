import express, { Router } from "express";
const router = Router();
import AllFlagsData from "../../models/allFlagsData.js";
import connectEnsureLogin from "connect-ensure-login"; 
import asyncHandler from "express-async-handler";


//Admin: Distinct Region form All Flags Data
router.get("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/FlagPuzzleGame/AddPuzzleGame");
  }));





export default router;
