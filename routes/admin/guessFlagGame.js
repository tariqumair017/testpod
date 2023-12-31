import express, { Router } from "express";
const router = Router();  
import path from "path";  
import AWS from "aws-sdk"; 
import GuessFlagGame from "../../models/guessFlagGame.js"; 
import asyncHandler from "express-async-handler";  
import middleware from "../../middleware/index.js";

 
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }); 


//Admin Create-Guess-Flag page
router.get("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
    res.render("Admin/GuessFlagGame/AddGuessFlagsGame", {title: "Create-GuessFlagGame"});
}));

//Admin: Create-Guess-Flag Handel
router.post("/add", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const find = await GuessFlagGame.findOne({region: req.body.region, level: req.body.level});
  
    if(!find)
    {  
        if(typeof(req.body.country) == "string")
        {  
          try {
            await s3.upload({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: `games/${req.files.IcorrectImg.name}`,
              Body: req.files.IcorrectImg.data,
              ContentType: req.files.IcorrectImg.mimetype,
              ACL: 'public-read'
            }).promise().then( async (data) => {
              var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg: data.Location, hint: req.body.hint}; 
                const singleGame = new GuessFlagGame({
                    region: req.body.region,
                    level: req.body.level, 
                    questions: question
                });
                await singleGame.save();
                console.log("GuessFlagGame Added Successfully"); 
                res.redirect("/admin/guess-flag-game/manage");
            });
          } catch (error) {
            console.log(error);
          }
        }
        else if(typeof(req.body.country) == "object")
        {
          const newGame = new GuessFlagGame({
            region: req.body.region,
            level: req.body.level
          });  
 
          for (let i = 0; i < req.body.country.length; i++) {
            try {
              await s3.upload({
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: `games/${req.files.IcorrectImg[i].name}`,
                  Body: req.files.IcorrectImg[i].data,
                  ContentType: req.files.IcorrectImg[i].mimetype,
                  ACL: 'public-read'
                }).promise().then((data) => { 
                  const newQuestion = {
                    country: req.body.country[i], 
                    Icountry: req.body.Icountry[i], 
                    correctImg: req.body.correctImg[i], 
                    IcorrectImg: data.Location, 
                    hint: req.body.hint[i]
                  }; 
                  newGame.questions.push(newQuestion); 
                }); 
            } catch (err) {
              console.log(err)
            }
          }        
 
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
  } catch (error) {
    return next(error.message);
  }
}));
    
//Admin: Search Region Api for Manage Page
router.get("/search/:region", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    const data = await GuessFlagGame.find({region: req.params.region}); 
    res.send(data); 
  } catch (error) {
    return next(error.message);
  }
}));

//Admin Manage-Guess-Flag page
router.get("/manage", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const data = await GuessFlagGame.find({});
    res.render("Admin/GuessFlagGame/ManageGuessFlagGame", { data, title: "Manage-GuessFlagGame" });
  } catch (error) {
    return next(error.message);
  }
}));

//Admin - Delete Whole Guess Flag Game
router.delete("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    const { id } = req.params;
    await GuessFlagGame.findByIdAndDelete(id);
    console.log("GuessFlagGame Deleted Successfully");  
    req.flash("success", `Game Deleted Successfully`);
    res.send({url: "/admin/guess-flag-game/manage"}); 
  } catch (error) {
    return next(error.message);
  }
}));

//Admin: Show All Questions of Guess Flag Game
router.get("/manage/:id/all-questions", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
      const data = await GuessFlagGame.findById(req.params.id); 
      if(!data)
      {
        req.flash("error", "Game not found");
        return res.redirect("/admin/guess-flag-game/manage");
      }
      res.render("Admin/GuessFlagGame/AllGuessFlagsGames", { data, title: "Manage-GuessFlagGame-Questions" }); 
    } catch (error) {
      return next(error.message);
    }
}));

//Admin - Edit Game Name
// router.put("/manage/:id", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
//     await GuessFlagGame.updateOne({_id: req.params.id}, {$set:{"gameName": req.body.gameName}});
//     res.redirect(`/admin/guess-flag-game/manage/${req.params.id}/all-questions`); 
// }));

// Admin: Add new Question in Game
router.post('/manage/:id/new', middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => { 
  try {
    var find = await GuessFlagGame.findById(req.params.id);
  
    if(find)
    {   
      try {
        await s3.upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `games/${req.files.IcorrectImg.name}`,
          Body: req.files.IcorrectImg.data,
          ContentType: req.files.IcorrectImg.mimetype,
          ACL: 'public-read'
        }).promise().then( async (data) => {
          var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg: data.Location, hint: req.body.hint}; 
        
          await GuessFlagGame.updateOne({_id: find._id}, {$push:{questions: question}});
          console.log("New Question Added"); 
          req.flash("success", "New Question Added");
          res.redirect(`/admin/guess-flag-game/manage/${req.params.id}/all-questions`); 
        });
      } catch (error) {
        console.log(error);
      } 
    }
    else
    {
      req.flash("error", "Game not found");
      res.redirect(`/admin/guess-flag-game/manage/${req.params.id}/all-questions`); 
    }
  } catch (error) {
    return next(error.message);
  }
}));
  
//Admin: Update Question of a Game
router.put("/manage/:cid/:pid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {   
  try {
    var question;
    if(req.files)
    { 
      let key_name = req.body.IcorrectImgDelete.split('/'); 
      
        try { 
          var params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `games/${key_name[key_name.length-1]}`,
          }; 
          await s3.deleteObject(params).promise();
    
          await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `games/${req.files.IcorrectImg.name}`,
            Body: req.files.IcorrectImg.data,
            ContentType: req.files.IcorrectImg.mimetype,
            ACL: 'public-read'
          }).promise().then( async (data) => {
            question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg: data.Location, hint: req.body.hint}; 
            await GuessFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
          });
        } catch (error) {
          console.log(error);
        }
    }
    else
    {
      await GuessFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.country": req.body.country, "questions.$.Icountry": req.body.Icountry, "questions.$.correctImg": req.body.correctImg, "questions.$.hint": req.body.hint}});
    }
   
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/admin/guess-flag-game/manage/${req.params.pid}/all-questions`); 
  } catch (error) {
    return next(error.message);
  }
}));


//Admin: Delete Question of Game
router.delete("/manage/:pid/:cid", middleware.isAdminLoggedin, asyncHandler(async (req, res, next) => {  
  try {
    await GuessFlagGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Question Deleted Successfully");
    req.flash("success", "Question Deleted Successfully");
    res.redirect(`/admin/guess-flag-game/manage/${req.params.pid}/all-questions`);
  } catch (error) {
    return next(error.message);
  }
}));



//=====================================
// User Activity For Draw Flag Game 
//=====================================



export default router;