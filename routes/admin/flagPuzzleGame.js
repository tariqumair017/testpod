import express, { Router } from "express";
const router = Router();
import AllFlagsData from "../../models/allFlagsData.js";
import PuzzleFlagGame from "../../models/puzzleFlagGame.js";
import connectEnsureLogin from "connect-ensure-login"; 
import asyncHandler from "express-async-handler";


//Admin: Distinct Region form All Flags Data
router.get("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/FlagPuzzleGame/AddPuzzleGame");
  }));

//Admin: Distinct Region form All Flags Data
router.get("/all-flags-data", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  const data = await AllFlagsData.distinct("region"); 
  res.send(data);
}));


//Admin: Find All Countries of Selected Region from All Flags Data
router.get("/all-flags-data/country/:region", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
  const data = await AllFlagsData.find({region: req.params.region});
  res.send(data);
}));

//Admin: Find Flag of selected Country from All Flags Data
router.get("/all-flags-data/country-for-flag/:country", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
  const data = await AllFlagsData.findOne({country: req.params.country});
  res.send(data);
}));

router.post("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 

  const find = await PuzzleFlagGame.findOne({region: req.body.region, level: req.body.level});


  if(!find)
  {  
      if(typeof(req.body.country) == "string")
      {  
        try {
          await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            ACL: 'public-read'
          }).promise().then( async (data) => {
            var question = {country: req.body.country, correctImg: req.body.correctImg}; 
              const singleGame = new PuzzleFlagGame({
                  region: req.body.region,
                  level: req.body.level, 
                  questions: question
              });
              await singleGame.save();
              console.log("PuzzleFlagGame Added Successfully"); 
              res.redirect("/admin/flag-puzzle-game/manage");
          });
        } catch (error) {
          console.log(error);
        }
      }
      else if(typeof(req.body.country) == "object")
      {
        const newGame = new PuzzleFlagGame({
          region: req.body.region,
          level: req.body.level
        });  

        for (let i = 0; i < req.body.country.length; i++) {
          try {
            await s3.upload({
                Bucket: process.env.AWS_BUCKET_NAME,
                ACL: 'public-read'
              }).promise().then((data) => { 
                const newQuestion = {
                  country: req.body.country[i], 
                  correctImg: req.body.correctImg[i], 
                }; 
                newGame.questions.push(newQuestion); 
              }); 
          } catch (err) {
            console.log(err)
          }
        }        

        await newGame.save();
        console.log("Multiple PuzzleFlagGame Added Successfully"); 
        res.redirect("/admin/flag-puzzle-game/manage");
      }  
  }
  else
  {   
      req.flash("error", `${find.region.toFUpperCase()} with Selected level is already exist`);
      res.redirect("/admin/flag-puzzle-game/add"); 
  }
}));


//Admin Manage-Puzzle-Flag page
router.get("/manage", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  const data = await PuzzleFlagGame.find({});
  res.render("Admin/FlagPuzzleGame/ManagePuzzleFlagGame", { data });
}));


//Admin Manage-Puzzle-Flag page
router.get("/edit", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  res.render("Admin/FlagPuzzleGame/AllPuzzleFlagGame");
}));
  




export default router;
