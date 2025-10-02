import HandleEroor from "../utils/handleError.js";
import handelAsyncError from "./handelAsyncError.js";
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const  verifyUserAuth=
handelAsyncError (async(req ,res ,next) =>
     {
        const {token} =req.cookies
       if(!token){
            return next(new HandleEroor("Authentication is missing",401))
        }
        //decoded the user login
        const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=await User.findById(decodeData.id)
        next()

        
    })