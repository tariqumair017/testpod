import express, { Router } from "express";
const router = Router(); 
import connectEnsureLogin from "connect-ensure-login";
 

// router.post('/logout', connectEnsureLogin.ensureLoggedIn("/"), function(req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });


export default router;
