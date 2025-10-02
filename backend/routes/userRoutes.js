import express from "express";
import { getUserDetails, loginUser, 
    logout,
     registerUser, 
    requestPasswordRest, 
    resetPassword, 
    updatePassword,
    updateProfile} from "../controller/userController.js";
const router=express.Router()

import { roleBasedAccess, verifyUserAuth } from '../Middleware/userAuth.js'




router.route("/register").post(registerUser)
// router.post("/login",loginUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logout)
router.route("/password/forgot").post(requestPasswordRest)
router.route("/reset/:token").post(resetPassword)
router.route("/profile").post(verifyUserAuth,getUserDetails)
router.route("/password/update").post(verifyUserAuth,updatePassword)
router.route("/profile/update").post(verifyUserAuth,updateProfile)


export default router