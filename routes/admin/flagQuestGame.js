import express, { Router } from "express";
const router = Router();  
import path from "path";  
import AWS from "aws-sdk";
import FlagQuestGame from "../../models/flagQuestGame.js"; 
import AllFlagsData from "../../models/allFlagsData.js";
import connectEnsureLogin from "connect-ensure-login";
import asyncHandler from "express-async-handler";  
 

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
   
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

 
//Admin Create-Guess-Flag page
router.get("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    res.render("Admin/FlagQuestGame/AddFlagQuestGame");
}));
 
//Admin: Create-Guess-Flag Handel
router.post("/add", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 

    const find = await FlagQuestGame.findOne({region: req.body.region, level: req.body.level});
  
    if(!find)
    {  
        if(typeof(req.body.country) == "string")
        {   
            let incorrectFlagsUrl = [];

            for (let i = 0; i < req.files[`IcorrectImg[0]`].length; i++) { 
                try {
                  await s3.upload({
                      Bucket: process.env.AWS_BUCKET_NAME,
                      Key: `flagQuestGame/${req.files[`IcorrectImg[0]`][i]['name']}`,
                      Body: req.files[`IcorrectImg[0]`][i]['data'],
                      ContentType: req.files[`IcorrectImg[0]`][i]['mimetype'],
                      ACL: 'public-read'
                    }).promise().then((data) => { 
                        incorrectFlagsUrl.push(data.Location);
                    }); 
                } catch (err) {
                  console.log(err)
                }
            }        
 
            var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint}; 
            const singleGame = new FlagQuestGame({
                region: req.body.region,
                level: req.body.level, 
                questions: question
            });
            await singleGame.save();
            console.log("FlagQuestGame Added Successfully"); 
            res.redirect("/admin/flag-quest-game/manage");
          
        }
        else if(typeof(req.body.country) == "object")
        {
          const newGame = new FlagQuestGame({
            region: req.body.region,
            level: req.body.level
          });  
          
          for (let i = 0; i < req.body.country.length; i++) {

            let incorrectFlagsUrl = [];
            
            for (let j = 0; j < req.files[`IcorrectImg[${i}]`].length; j++) { 
              try {
                await s3.upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: "flagQuestGame/" + req.files[`IcorrectImg[${i}]`][j]['name'],
                    Body: req.files[`IcorrectImg[${i}]`][j]['data'],
                    ContentType: req.files[`IcorrectImg[${i}]`][j]['mimetype'],
                    ACL: 'public-read'
                  }).promise().then((data) => { 
                    incorrectFlagsUrl.push(data.Location);
                  }); 
              } catch (err) {
                console.log(err)
              } 
            }

            const newQuestion = {country: req.body.country[i], Icountry: req.body.Icountry[i], correctImg: req.body.correctImg[i], IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint[i]}; 
            newGame.questions.push(newQuestion); 
          }        
 
          await newGame.save();
          console.log("Multiple FlagQuestGame Added Successfully"); 
          res.redirect("/admin/flag-quest-game/manage");
        }  
    }
    else
    {   
        req.flash("error", `${find.region.toUpperCase()} with Selected level is already exist`);
        res.redirect("/admin/flag-quest-game/add"); 
    }
}));
     
//Admin Manage-Guess-Flag page
router.get("/manage", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await FlagQuestGame.find({});
    res.render("Admin/FlagQuestGame/ManageFlagQuestGame", { data });
}));

//Admin - Delete Whole Guess Flag Game
router.delete("/manage/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const { id } = req.params;
    await FlagQuestGame.findByIdAndDelete(id);
    console.log("FlagQuestGame Deleted Successfully");  
    req.flash("success", `Game Deleted Successfully`);
    res.send({url: "/admin/flag-quest-game/manage"}); 
}));

//Admin: Show All Questions of Guess Flag Game
router.get("/manage/:id/all-questions", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await FlagQuestGame.findById(req.params.id); 
    if(!data)
    {
      req.flash("error", "Game not found");
      return res.redirect("/admin/flag-quest-game/manage");
    }
    res.render("Admin/FlagQuestGame/AllFlagQuestGame", { data }); 
}));

//Admin - Edit Game Name
// router.put("/manage/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
//     await FlagQuestGame.updateOne({_id: req.params.id}, {$set:{"gameName": req.body.gameName}});
//     res.redirect(`/admin/flag-quest-game/manage/${req.params.id}/all-questions`); 
// }));

// Admin: Add new Question in Game
router.post('/manage/:id/new', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
  
    var find = await FlagQuestGame.findById(req.params.id);
  
      if(find)
      {    
        let incorrectFlagsUrl = [];

        for (let i = 0; i < req.files.IcorrectImg.length; i++) { 
            try {
              await s3.upload({
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: `flagQuestGame/${req.files.IcorrectImg[i]['name']}`,
                  Body: req.files.IcorrectImg[i]['data'],
                  ContentType: req.files.IcorrectImg[i]['mimetype'],
                  ACL: 'public-read'
                }).promise().then((data) => { 
                    incorrectFlagsUrl.push(data.Location);
                }); 
            } catch (err) {
              console.log(err)
            }
        }        

        var question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint}; 

        await FlagQuestGame.updateOne({_id: find._id}, {$push:{questions: question}});
        console.log("New Question Added"); 
        req.flash("success", "New Question Added");
        res.redirect(`/admin/flag-quest-game/manage/${req.params.id}/all-questions`);   
      }
      else
      {
        req.flash("error", "Game not found");
        res.redirect(`/admin/flag-quest-game/manage/${req.params.id}/all-questions`); 
      }
}));


 // Admin: Edit Question of a Guess Flag Game
 router.get('/manage/:id/edit', connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    const data = await FlagQuestGame.findById(req.params.id);
    res.send(data);  
}));
  
//Admin: Update Question of a Game
router.put("/manage/:cid/:pid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {   
    var question;
    if(req.files)
    { 
      for (let i = 0; i < req.body.IcorrectImgDelete.length; i++) {
        let key_name = req.body.IcorrectImgDelete[i].split('/');  
        try { 
          var params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `flagQuestGame/${key_name[key_name.length-1]}`,
          }; 
          await s3.deleteObject(params).promise(); 
        } catch (error) {
          console.log(error);
        }
      }
        
      let incorrectFlagsUrl = [];

      for (let i = 0; i < req.files.IcorrectImg.length; i++) { 
          try {
            await s3.upload({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `flagQuestGame/${req.files.IcorrectImg[i]['name']}`,
                Body: req.files.IcorrectImg[i]['data'],
                ContentType: req.files.IcorrectImg[i]['mimetype'],
                ACL: 'public-read'
              }).promise().then((data) => { 
                  incorrectFlagsUrl.push(data.Location);
              }); 
          } catch (err) {
            console.log(err)
          }
      }        
 
      question = {country: req.body.country, Icountry: req.body.Icountry, correctImg: req.body.correctImg, IcorrectImg1: incorrectFlagsUrl[0], IcorrectImg2: incorrectFlagsUrl[1], IcorrectImg3: incorrectFlagsUrl[2], hint: req.body.hint}; 
      await FlagQuestGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$": question}});
           
    }
    else
    {
      await FlagQuestGame.findOneAndUpdate({"questions._id": req.params.cid}, {$set:{"questions.$.country": req.body.country, "questions.$.Icountry": req.body.Icountry, "questions.$.correctImg": req.body.correctImg, "questions.$.hint": req.body.hint}});
    }
   
    console.log("Question Updated");
    req.flash("success", "Question Updated Successfully");
    res.redirect(`/admin/flag-quest-game/manage/${req.params.pid}/all-questions`); 
}));


//Admin: Delete Question of Game
router.delete("/manage/:pid/:cid", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => {  
    await FlagQuestGame.findOneAndUpdate({"questions._id": req.params.cid}, {$pull:{"questions":{_id: req.params.cid}}});
    console.log("Question Deleted Successfully");
    req.flash("success", "Question Deleted Successfully");
    res.redirect(`/admin/flag-quest-game/manage/${req.params.pid}/all-questions`);
}));





export default router;
