import handelAsyncError from "../Middleware/handelAsyncError.js";
import User from '../models/userModel.js'
import HandleEroor from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";



export const registerUser=handelAsyncError(async(req,res,next)=>{
  

        const {name,email,password}= req.body
      
        
        const user = await User.create({
              
           
            name,
            email,
            password,
            avathar:{
                public_id:"This is temp ID",
                url:"This is temp url "
            }

        })
       
        sendToken(user,200,res)


})


//User login

export const loginUser=handelAsyncError(async(req,res,next)=>{

    const {email,password}=req.body
    if(!email|| !password){
        return next(new HandleEroor("Email or Password cannot be empty ",400))
    }

    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next (new HandleEroor("Invaild email or password",401))
    }

    const isPasswordVaild = await user.verifyPassword(password)
   
   if(!isPasswordVaild){
    return next (new HandleEroor("Enter vaild password",401))
   }
    
   sendToken(user,200,res)

})

export const logout= handelAsyncError(async (req,res,next)=>{

    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
        })

    
    res.status(200).json({
        success:true,
        message:"Successfully Logged out"
    })
})

