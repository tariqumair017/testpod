import express, { Router } from "express";
const router = Router();  
import path from "path";  
import AllFlagsData from "../../models/allFlagsData.js";
import GuessFlagGame from "../../models/guessFlagGame.js";
import connectEnsureLogin from "connect-ensure-login";
import asyncHandler from "express-async-handler";  


//Admin: Distinct Region form All Flags Data
router.get("/all-flags-data", asyncHandler(async (req, res, next) => { 
  const data = await AllFlagsData.distinct("region"); 
  res.send(data);
}));

//Admin: Find All Countries of Selected Region from All Flags Data
router.get("/all-flags-data/country/:region", asyncHandler(async (req, res, next) => {  
  const data = await AllFlagsData.find({region: req.params.region});
  res.send(data);
}));

//Admin: Find Flag of selected Country from All Flags Data
router.get("/all-flags-data/country-for-flag/:country", asyncHandler(async (req, res, next) => {  
  const data = await AllFlagsData.findOne({country: req.params.country});
  res.send(data);
}));

//Admin Create-Guess-Flag page
router.get("/add", asyncHandler(async (req, res, next) => { 
    res.render("Admin/GuessFlagGame/AddGuessFlagsGame");
}));

//Admin: Create-Guess-Flag Handel
router.post("/add", asyncHandler(async (req, res, next) => { 

    const find = await GuessFlagGame.findOne({region: req.body.region, level: req.body.level});
  
    if(!find)
    {  
        if(typeof(req.body.country) == "string")
        {  
          var IcorrectFileName = Date.now() + '-' + req.files.IcorrectImg.name;
          const newPath2  = path.join(process.cwd(), '/public/upload-images', IcorrectFileName);
          req.files.IcorrectImg.mv(newPath2);

          var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg: IcorrectFileName, hint: req.body.hint}; 
          const singleGame = new GuessFlagGame({
              region: req.body.region,
              level: req.body.level, 
              questions: question
          });
          await singleGame.save();
          console.log("GuessFlagGame Added Successfully"); 
          res.redirect("/admin/guess-flag-game/manage");
        }
        else if(typeof(req.body.country) == "object")
        {
          const newQuestions = [];
          for (let i = 0; i < req.body.country.length; i++) {  

            var IcorrectFileName = Date.now() + '-' + req.files.IcorrectImg[i].name;
            const newPath2  = path.join(process.cwd(), '/public/upload-images', IcorrectFileName);
            req.files.IcorrectImg[i].mv(newPath2);  

              const newQuestion = {
                country: req.body.country[i], 
                Icountry: req.body.Icountry[i], 
                correctImg: req.body.correctImg[i], 
                IcorrectImg: IcorrectFileName, 
                hint: req.body.hint[i]
            }; 
  
              newQuestions.push(newQuestion);
          }
          const newGame = new GuessFlagGame({
            region: req.body.region,
            level: req.body.level, 
            questions: newQuestions
        });
          await newGame.save(); 
          console.log("Multiple GuessFlagGame Added Successfully"); 
          res.redirect("/admin/guess-flag-game/manage");
        }  
    }
    else
    {   
        req.flash("error", `${find.region.toUpperCase()} with Selected level is already exist`);
        res.redirect("/admin/guess-flag-game/add"); 
    }
}));
    

//Admin Manage-Guess-Flag page
router.get("/manage", asyncHandler(async (req, res, next) => { 
    const data = await GuessFlagGame.find({});
    res.render("Admin/GuessFlagGame/ManageGuessFlagGame", { data });
}));

//Admin - Delete Whole Guess Flag Game
router.delete("/manage/:id", asyncHandler(async (req, res, next) => { 
    const { id } = req.params;
    await GuessFlagGame.findByIdAndDelete(id);
    console.log("GuessFlagGame Deleted Successfully");  
    req.flash("success", `Game Deleted Successfully`);
    res.send({url: "/admin/guess-flag-game/manage"}); 
}));

//Admin: Show All Questions of Guess Flag Game
router.get("/manage/:id/all-questions", asyncHandler(async (req, res, next) => { 
    const data = await GuessFlagGame.findById(req.params.id); 
    if(!data)
    {
      req.flash("error", "Game not found");
      return res.redirect("/admin/guess-flag-game/manage");
    }
    res.render("Admin/GuessFlagGame/AllGuessFlagsGames", { data }); 
}));

//Admin - Edit Game Name
// router.put("/manage/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
//     await GuessFlagGame.updateOne({_id: req.params.id}, {$set:{"gameName": req.body.gameName}});
//     res.redirect(`/admin/guess-flag-game/manage/${req.params.id}/all-questions`); 
// }));

// Admin: Add new Question in Game
router.post('/manage/:id/new', asyncHandler(async (req, res, next) => { 
  
    var find = await GuessFlagGame.findById(req.params.id);
  
      if(find)
      { 
        var IcorrectFileName = Date.now() + '-' + req.files.IcorrectImg.name;
        const newPath2  = path.join(process.cwd(), '/public/upload-images', IcorrectFileName);
        req.files.IcorrectImg.mv(newPath2);

        var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg: IcorrectFileName, hint: req.body.hint}; 
          
        await GuessFlagGame.updateOne({_id: find._id}, {$push:{questions: question}});
        console.log("New Question Added"); 
        req.flash("success", "New Question Added");
        res.redirect(`/admin/guess-flag-game/manage/${req.params.id}/all-questions`); 
      }
      else
      {
        req.flash("error", "Game not found");
        res.redirect(`/admin/guess-flag-game/manage/${req.params.id}/all-questions`); 
      }
}));


 // Admin: Edit Question of a Guess Flag Game
 router.get('/manage/:id/edit', asyncHandler(async (req, res, next) => { 
    const data = await GuessFlagGame.findById(req.params.id);
    res.send(data);  
}));
  
//Admin: Update Question of a Game
router.put("/manage/:cid/:pid", asyncHandler(async (req, res, next) => {   
    var question;
    if(req.files)
    {
        var IcorrectFileName = Date.now() + '-' + req.files.IcorrectImg.name;
        const newPath2  = path.join(process.cwd(), '/public/upload-images', IcorrectFileName);
        req.files.IcorrectImg.mv(newPath2);

        question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg: IcorrectFileName, hint: req.body.hint}; 
        await GuessFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
    }
    else
    {
      await GuessFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.country": req.body.country, "questions.$.Icountry": req.body.Icountry, "questions.$.correctImg": req.body.correctImg, "questions.$.hint": req.body.hint}});
    }
   
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/admin/guess-flag-game/manage/${req.params.pid}/all-questions`); 
}));


//Admin: Delete Question of Game
router.delete("/manage/:pid/:cid", asyncHandler(async (req, res, next) => {  
    await GuessFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Question Deleted Successfully");
    req.flash("success", "Question Deleted Successfully");
    res.redirect(`/admin/guess-flag-game/manage/${req.params.pid}/all-questions`);
}));



//=====================================
// User Activity For Draw Flag Game 
//=====================================



export default router;