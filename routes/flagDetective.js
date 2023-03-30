import express, { Router } from "express";
const router = Router();
import connectEnsureLogin from "connect-ensure-login"; 
import asyncHandler from "express-async-handler";

//Admin: Create Flag Detective Game Page
router.get("/game-management/create-flag-detective-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/AddFlagDetectiveGame");
  }));


//Admin: Manage Flag Detective Game Page
router.get("/game-management/manage-flag-detective-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/ManageFlagDetectiveGame");
  }));


//Admin: All Flag Detective Game Page
router.get("/game-management/all-flag-detective-game", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/AllFlagDetectiveGame");
  }));
export default router;
