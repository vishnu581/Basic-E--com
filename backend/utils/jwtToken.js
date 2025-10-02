export const sendToken= (user,statusCode,res)=>{
    
    //genrating token
    const token=user.getJWTToken()


    //option for cookies 

    const options = {
        expires:new Date(Date.now()+process.env.EXPIRE_COOKIE*24*60*60*1000),
        httpOnly:true
    }

    res.status(statusCode)
    .cookie('token',token,options)
        
    .json({
        success:true,
        user,
        token

    })
    
    
}