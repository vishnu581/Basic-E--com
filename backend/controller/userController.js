import { log } from "console";
import handelAsyncError from "../Middleware/handelAsyncError.js";
import User from '../models/userModel.js'
import HandleEroor from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto'


//regiser user
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
//logout
export const logout= handelAsyncError(async (req,res,next)=>{
     //kill cookies 
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
        })

    
    res.status(200).json({
        success:true,
        message:"Successfully Logged out"
    })
})

//forgot password

export const requestPasswordRest = handelAsyncError(async(req,res,next )=>{
    const {email} =req.body
    console.log(email)
    const user= await User.findOne({email})
    if(!email) return next(new HandleEroor("User does't exit",400))
    let resetToken
    try{

        resetToken=user.generatePasswordResetToken()
   await user.save({validateBeforeSave:false})
        

    }catch(error){
        console.log(error)
       return next(new HandleEroor("could not save reset token,please try agian later",500))
    }
    
   const resetPasswordURL=`http://localhost/api/v1/reset/${resetToken}`
   const message=`This link will reset your password${resetPasswordURL} link expires in 5 mins`
   
   try{

    //send email
   await sendEmail({
    email:user.email,
    subject:'Password reset Request',
    message
   })
   res.status(200).json({
    success:true,
    message:`Email is sent to ${user.email} successfully`
   })

   }catch(error){
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save({validateBeforeSave:false})
    console.log(error)
    return next(new HandleEroor("Email couldn't be send ,please try again later",500))


   }


})


//reset password

export const resetPassword=handelAsyncError(async(req,res,next)=>{
  
     
  const resetPasswordToken=crypto.createHash('sha256')
       .update(req.params.token).digest("hex")

   
  
   const user= await User.findOne({
    resetPasswordToken,
     resetPasswordExpire:{$gt:Date.now()}
   })
   
   if(!user){
    return next (new HandleEroor("Rest Password token is Invalid or has been expired",400))
   }

   const {password,confirmPassword}=req.body
   if(password!=confirmPassword) return next(new HandleEroor("Password miss match",400))

   
   user.password=password
   user.resetPasswordToken=undefined
   user.resetPasswordExpire=undefined 
   await user.save()
   sendToken(user,200,res)


})

//get user details

export const getUserDetails= handelAsyncError(async(req,res,next)=>{
    
    
    const user = await User.findById(req.user.id)
   res.status(200).json({
    success:true,user
   })
    
})

//Update passwor


export const updatePassword=handelAsyncError(async(req,res,next)=>{

    const {oldPassword,newPassword,confirmPassword}=req.body

    const user= await User.findById(req.user.id).select('+password')

    const checkPasswordMatch= await user.verifyPassword(oldPassword)
    if(!checkPasswordMatch) return next(new HandleEroor("old password is incorrect",400))
    if(newPassword!=confirmPassword) return  next(new HandleEroor("password mismatch",400))
     
    user.password=newPassword
    await user.save()
    sendToken(user,200,res)

})



export const updateProfile=handelAsyncError(async(req,res,next)=>{

    const {name,email}=req.body

    const updateUserDetails={
        name,
        email
    }

    const user= await User.findByIdAndUpdate(req.user.id,
        updateUserDetails,
        {
            new:true,
            runValidators:true
        }
       
    )

 res.status(200).json({
    success:true,
   message:"User Updated",
    user
 })

})

//ADMIN GETTING USER DETAILS


export const getUserList= handelAsyncError(async(req,res,next)=>{
    const users= await User.find()
     if(!users) return next(new HandleEroor("No Users",400))
    res.status(200).json({
        success:true,
        users
    })
})

//ADMIN GITIING ONE USER INFORMATION


export const getSingleUser= handelAsyncError(async(req,res,next)=>{
    
   const id = req.params.id
    
    const user= await User.findById(id)
   if(!user) return next(new HandleEroor("No User",400))
   
    res.status(200).json({
        success:true,
        user
    })
})

//admin - changin user role

export const  updateUserRole=handelAsyncError(async(req,res,next)=>{
    const {role}=req.body
    const newUserData={
        role
    }
 
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true
    })
      if(!user) return next(new HandleEroor("No User",400))
     res.status(200).json({
        success:true,
        user
    })
})

//admin delete user profile

export const  deleteUser=handelAsyncError(async(req,res,next)=>{
 
    const user = await User.findById(req.params.id)
      if(!user) return next(new HandleEroor("No User",400))
    
    await User.findByIdAndDelete(req.params.id)
    
    
        res.status(200).json({
        success:true,
        message:"user deleted successfully"
        
    })
})

