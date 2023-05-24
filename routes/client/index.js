import express, { Router } from "express";
const router = Router();
import QuizModel from "../../models/test.js";
import guessCountryGame from "../../models/guessCountryGame.js";
import GuessFlagGame from "../../models/guessFlagGame.js";
import FlagPuzzleGame from "../../models/flagPuzzleGame.js";
import AllFlagsData from "../../models/allFlagsData.js";
import ipify from "ipify";
import asyncHandler from "express-async-handler";   
import connectEnsureLogin from "connect-ensure-login";
 

// Sign Up 
router.get("/sign-up", asyncHandler(async (req, res, next) => { 
  res.render("Client/index/SignUp");
}));

router.get("/hello", asyncHandler(async (req, res, next) => { 
    res.render("Client/index/hello");
  }));


//Handel Sign Up Logic
// router.post('/admin/sign-up', asyncHandler(async (req, res, next) => {  
//     try {
//       const newAdmin = new Admin({username: req.body.username, email: req.body.email});
//       const registeredAdmin = await Admin.register(newAdmin, req.body.password); 
//       res.redirect("/login");
//     } catch (error) { 
//       req.flash("error", error.message);
//       return res.redirect("/sign-up");
//     }
// }));

// Login Page 
router.get("/login", connectEnsureLogin.ensureLoggedOut("/admin/dashboard"), asyncHandler(async (req, res, next) => { 
    res.render("Client/index/Login");
}));


//Client Index page
router.get("/", asyncHandler(async (req, res, next) => {
    //Store All Flags Data
    // const all = await fetch("https://restcountries.com/v3.1/all");
    // const allFlags = await all.json(); 

    // allFlags.forEach(async(element) => {  
    //     const newData = new AllFlagsData({ country: element.name.common, flag: element.flags.svg, region: element.region });
    //     await newData.save(); 
    // });   

    //Update All Flags Data
    // var allFlags = await AllFlagsData.find({}); 
    // console.log(allFlags.length);

    // allFlags.forEach(async(element) => { 
    //     if(element.region == 'Americas')
    //     { 
    //         await AllFlagsData.updateOne({_id: element._id}, {$set:{"region": 'America'}});
    //     }
    // });

    const gamesliderData = [
        {
            name:"Guess Country",
            detail:"Can You Match Flag With Its Country?",
            path:"guessCountry",
            image:"/client/img/pngs/5.png"
        },
        {
            name:"Draw Flags",
            detail:"Can You Draw Flag With Its Country?",
            path:"drawFlag",
            image:"/client/img/pngs/5.png"
        },
        {
            name:"Guess Flags",
            detail:"Can You Match Country With Its Flags?",
            path:"guessFlag",
            image:"/client/img/pngs/5.png"
        },
        {
            name:"Flags Puzzle",
            detail:"Can You Solve The Puzzle of Flags?",
            path:"flagPuzzle",
            image:"/client/img/pngs/5.png"
        },
        {
            name:"Learn About Flags",
            detail:"Click On Flags To Learn About Them?",
            path:"learnAboutFlag",
            image:"/client/img/pngs/5.png"
        },
        {
            name:"Guess Country",
            detail:"Can You Match Flag With Its Country?",
            path:"guessCountry",
            image:"/client/img/pngs/5.png"
        },
        {
            name:"Guess Country",
            detail:"Can You Match Flag With Its Country?",
            path:"guessCountry",
            image:"/client/img/pngs/5.png"
        },
        
    ]

    const data = [
        {
            name:"You’ll Pass",
            detail:"Our clients boast an impressive 99.2% success rate in passing their DMV written test.",
            icon:"https://testpod-bucket.s3.amazonaws.com/pages/pv-icon1.png",
        },
        {
            name:"We Cover It All",
            detail:"Our tests use real DMV questions for all licenses, so you can avoid surprises on exam day.",
            icon:"https://testpod-bucket.s3.amazonaws.com/pages/pv-icon2.png",

        },
        {
            name:"Fast & Easy",
            detail:"Get immediate feedback as you begin a test, with the ability to start within seconds.",
            icon:"https://testpod-bucket.s3.amazonaws.com/pages/pv-icon3.png",

        },
        {
            name:"Always FREE",
            detail:"Absolutely free with no strings attached, including no hidden fees or subscriptions.",
            icon:"https://testpod-bucket.s3.amazonaws.com/pages/pv-icon4.png",

        },
        {
            name:"State-specific",
            detail:"Our test questions are tailored to individual U.S. states, with the majority being unique to each state.",
            icon:"https://testpod-bucket.s3.amazonaws.com/pages/pv-icon5.png",

        },
        {
            name:"Vast Question Bank",
            detail:"Prepare using accurate, up-to-date questions based on your state's official handbook and traffic laws.",
            icon:"https://testpod-bucket.s3.amazonaws.com/pages/pv-icon6.png",

        }
    ]


    res.render("Client/index/index", { title: "Testpod",data,gamesliderData });
}));




//Client All GAme page
router.get("/games", asyncHandler(async (req, res, next) => {
    const data = [
        {
            name: "Guess Country Game",
            image: "https://testpod-bucket.s3.amazonaws.com/pages/3.jpg",
            url:"/guess-country/regions"
        },
        {
            name: "Flag detective Game",
            image: "https://testpod-bucket.s3.amazonaws.com/pages/4.jpg",
            url:"/flag-detective/regions"
        },
         {
            name: "Draw Flag Game",
            image: "https://testpod-bucket.s3.amazonaws.com/pages/1.jpg",
            url:"/draw-flags"
        }, {
            name: "Guess Flag Game",
            image: "https://testpod-bucket.s3.amazonaws.com/pages/5.jpg",
            url:"/guess-flag/regions"
        },
        {
           name: "Flag Quest Game",
           image: "https://testpod-bucket.s3.amazonaws.com/pages/6.jpg",
           url:"/flag-quest/regions"
       },
        {
            name: "Flag Puzzle Game",
            image: "https://testpod-bucket.s3.amazonaws.com/pages/2.jpg"
        },
         {
            name: "Learn About Flag",
            image: "https://testpod-bucket.s3.amazonaws.com/pages/7.jpg",
            url:"/learn-about-flags"
        },
    ]

    res.render("Client/index/AllGames", { title: "Flags Games", data });
}));

//Game Slider Control 
router.get("/game-slider/index/:game", asyncHandler(async (req, res, next) => { 
    try {
        
        if(req.params.game == 'guessCountry')
        {    
            //=== IP Address (Can get only When Site is deployed) ====//  
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
            if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
            }
            //=== This is a Package to detect IP Address ====//  
            // const ClientIP = await ipify({useIPv6: false});
            // console.log(ClientIP);
            
            //=== Fetch Location through IP Address ====//
            const response = await fetch(`http://ipwho.is/${ip}`);
            var location = await response.json();
            const data = await guessCountryGame.distinct("region");
            for (let i = 0; i < data.length; i++) { 
                if(location.continent.includes(data[i]))
                {
                    return res.redirect(`/guess-country/${data[i].toLowerCase()}/easy`); 
                }
            }
        }   
        else if(req.params.game == 'drawFlag')
        { 
            return res.redirect("/draw-flags");
        } 
        else if(req.params.game == 'guessFlag')
        { 
            //=== IP Address (Can get only When Site is deployed) ====//  
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
            if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
            }
            //=== This is a Package to detect IP Address ====//  
            // const ClientIP = await ipify({useIPv6: false});
            // console.log(ClientIP);
            
            //=== Fetch Location through IP Address ====//
            const response = await fetch(`http://ipwho.is/${ip}`);
            var location = await response.json();
            const data = await GuessFlagGame.distinct("region");
            for (let i = 0; i < data.length; i++) { 
                if(location.continent.includes(data[i]))
                {
                    return res.redirect(`/guess-flag/${data[i].toLowerCase()}/easy`); 
                }
            }
        }
        else if(req.params.game == 'flagPuzzle')
        { 
            //=== IP Address (Can get only When Site is deployed) ====//  
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
            if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
            }
            //=== This is a Package to detect IP Address ====//  
            // const ClientIP = await ipify({useIPv6: false});
            // console.log(ClientIP);
            
            //=== Fetch Location through IP Address ====//
            const response = await fetch(`http://ipwho.is/${ip}`);
            var location = await response.json();
            const data = await FlagPuzzleGame.distinct("region");
            for (let i = 0; i < data.length; i++) { 
                if(location.continent.includes(data[i]))
                {
                    return res.redirect(`/flag-puzzle/${data[i].toLowerCase()}/easy`); 
                }
            }
        }
        else if(req.params.game == 'learnAboutFlag')
        { 
            return res.redirect("/learn-about-flags");
        }
        else if(req.params.game == 'test')
        {
            return res.redirect("/dmv-test/states");
        }
        else
        {
            return res.redirect("/");
        }
    } catch (error) {
        return next(error.message);
    }
}));

//Client About page
router.get("/about-us", asyncHandler(async (req, res, next) => {
    res.render("Client/index/About", { title: "About" });
}));

//Client Blog-Details page
router.get("/blog-details", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Blog-Details", { title: "Blog-Details" });
}));

//Client Blog page
router.get("/blog", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Blog", { title: "Blog" });
}));

//Client Contact page
router.get("/contact-us", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Contact", { title: "Contact" });
}));

//Client Courses-Details page
router.get("/courses-details", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Courses-Details", { title: "Courses-Details" });
}));

//Client Courses page
router.get("/courses", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Courses", { title: "Courses" });
}));

//Client FAQ page
router.get("/faq", asyncHandler(async (req, res, next) => {
    res.render("Client/index/FAQ", { title: "FAQ" });
}));

//Client Pricing page
router.get("/pricing", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Pricing", { title: "Pricing" });
}));

//Client Services-Details page
router.get("/services-details", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Services-Details", { title: "Services-Details" });
}));

//Client Services page
router.get("/services", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Services", { title: "Services" });
}));

//Client Shop-Details page
router.get("/shop-details", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Shop-Details", { title: "Shop-Details" });
}));

//Client Shop page
router.get("/shop", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Shop", { title: "Shop" });
}));

//Client Team-Details page
router.get("/team-details", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Team-Details", { title: "Team-Details" });
}));

//Client Team page
router.get("/team", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Team", { title: "Team" });
}));

//Client Team page
router.get("/thank-you", asyncHandler(async (req, res, next) => {
    res.render("Client/index/Thank-You", { title: "Thank-You" });
}));



export default router;