
import express, { Router } from "express";
const router = Router(); 
import asyncHandler from "express-async-handler";  





//Client Flag Puzzle Page
router.get("/flag-puzzle", asyncHandler(async (req, res, next) => { 
    res.render("Client/FlagPuzzleGame/FlagPuzzle"); 
}));


export default router;