import express from "express";
import {  deleteUser, getSingleUser, getUserDetails, getUserList, loginUser, 
    logout,
     registerUser, 
    requestPasswordRest, 
    resetPassword, 
    updatePassword,
    updateProfile,
    updateUserRole} from "../controller/userController.js";
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
router.route("/admin/users").get(verifyUserAuth,roleBasedAccess('admin'),getUserList)
router.route("/admin/user/:id").get(verifyUserAuth,roleBasedAccess('admin'),getSingleUser)
router.route("/admin/user/:id").put(verifyUserAuth,roleBasedAccess('admin'),updateUserRole)
router.route("/admin/user/:id").delete(verifyUserAuth,roleBasedAccess('admin'),deleteUser)


export default router