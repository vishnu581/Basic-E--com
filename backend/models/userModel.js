import mongoose from "mongoose";
import validator from 'validator'
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
    type:String,
    required:[true,"Please Enter Your name"],
    maxLength:[25,"Invaild name .Please Enter Name with below 25 characters "],
    minLength:[3,"Name should contain more than 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should contain more than 8 characters"]
        ,select:false
    },
    avathar:{

        public_id:{
            type:String,
            required:true

        },url:{
            type:String,
            required:true

        }

    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{timestamps:true})

//password hashing
userSchema.pre("save",async function(){
   
    
    this.password=await bcryptjs.hash(this.password,10)
    if(!this.isModified("password")){
        return next()
    }

})


//jwt web token


userSchema.methods.getJWTToken=function(){


    return jwt.sign({id:this._id},process.env.
        JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE})
    }



//


userSchema.methods.verifyPassword= async function(userEnteredPassword){
    
    
    return await bcryptjs.compare(userEnteredPassword,this.password)
}




export default mongoose.model("User",userSchema)