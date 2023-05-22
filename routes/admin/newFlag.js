import express, { Router } from "express";
const router = Router(); 
import path from "path";  
import AWS from "aws-sdk";
import DrawNewFlagModel from "../../models/drawNewFlag.js"; 
import asyncHandler from "express-async-handler";  
import connectEnsureLogin from "connect-ensure-login";


try {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
} catch (error) {
    throw new Error(error.message);
}

  
//Admin: Draw-New-Flags Page
router.get("/", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    try {
        const data = await DrawNewFlagModel.find({});
        res.render("Admin/NewFlag/Draw-New-Flags", { data, title: "Create-NewFlag" });
    } catch (error) {
        return next(error.message);
    }
}));
   
//Admin: Draw-New-Flags Page Handel
router.post("/", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    try {
        const find = await DrawNewFlagModel.findOne({country: {$regex : req.body.country.toString(), "$options": "i" }});

        if(!find)
        {     
            var shapeFile;

            try {
                await s3.upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `newFlag/${req.files.shapeImg.name}`,
                    Body: req.files.shapeImg.data,
                    ContentType: req.files.shapeImg.mimetype,
                    ACL: 'public-read'
                }).promise().then((data) => { 
                    shapeFile = data.Location;
                }); 
            } catch (err) {
                console.log(err)
            }

            const newFlag = new DrawNewFlagModel({
                country: req.body.country,
                flagUrl: req.body.flagUrl,
                flagDetails: req.body.flagDetails, 
                shapeImg: shapeFile,
                correctColors: JSON.parse(req.body.selectedColors),
                arrangement: req.body.arrangement
            });
            await newFlag.save();
            console.log("New Flag Added Successfully"); 
            req.flash("success", `New Flag Added Successfully`);
            res.send({url: "/admin/draw-flag-game/add-new-flag"}); 
        }
        else
        {   
            console.log(`${find.country} is already exist`); 
            req.flash("error", `${find.country} is already exist`);
            res.send({url: "/admin/draw-flag-game/add-new-flag"}); 
        }
    } catch (error) {
        return next(error.message);
    }
}));  
  
//Admin - Update Game Name
router.put("/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    try {
        if(req.files)
        {
            var shapeFile;

            try {
                await s3.upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `newFlag/${req.files.shapeImg.name}`,
                    Body: req.files.shapeImg.data,
                    ContentType: req.files.shapeImg.mimetype,
                    ACL: 'public-read'
                }).promise().then((data) => { 
                    shapeFile = data.Location;
                }); 
            } catch (err) {
                console.log(err)
            }

            await DrawNewFlagModel.findByIdAndUpdate(req.params.id, {
                country: req.body.country,
                flagUrl: req.body.flagUrl,
                flagDetails: req.body.flagDetails, 
                shapeImg: shapeFile,
                correctColors: JSON.parse(req.body.selectedColors),
                arrangement: req.body.arrangement
            });
            req.flash("success", `Flag Updated Successfully`);
            res.send({url: "/admin/draw-flag-game/add-new-flag"}); 
        }
        else
        {
            await DrawNewFlagModel.findByIdAndUpdate(req.params.id, {
                country: req.body.country,
                flagUrl: req.body.flagUrl,
                flagDetails: req.body.flagDetails,  
                correctColors: JSON.parse(req.body.selectedColors),
                arrangement: req.body.arrangement
            });
            req.flash("success", `Flag Updated Successfully`);
            res.send({url: "/admin/draw-flag-game/add-new-flag"}); 
        }
    } catch (error) {
        return next(error.message);
    }
}));
 

//Admin - Delete Flag 
router.delete("/:id", connectEnsureLogin.ensureLoggedIn("/login"), asyncHandler(async (req, res, next) => { 
    try {
        const { id } = req.params;
        await DrawNewFlagModel.findByIdAndDelete(id);
        console.log("Flag Deleted Successfully"); 
        req.flash("success", `Flag Deleted Successfully`);
        res.redirect("/admin/draw-flag-game/add-new-flag");
    } catch (error) {
        return next(error.message);
    }  
}));
  

export default router;
