import HandleEroor from "../utils/handleError.js"

export default (err,req,res,next)=>{
    err.statusCode=err.statusCode||500
    err.message=err.message|| "Internal server Error"
    //cast error

    if(err.name==='CastError'){

        const message = `This is invalid resource ${err.path}`
        err = new HandleEroor(message,404)
    }
    //Duplicate key error
    if(err.code===11000){
        const message = `This ${Object.keys(err.keyValue)} already registerd .Please Login`
        err=new HandleEroor(message,404)
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

