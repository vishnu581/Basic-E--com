import Product from "../models/productsModels.js"
import HandleEroor from "../utils/handleError.js";

//creating Products


export const createProducts = async(req,res)=>{

  const product =  await Product.create(req.body)
  res.status(201).json({
    success:true,
    product
  })
    

}



//get all products


export const getAllproducts=async (req,res)=>{
    const products = await Product.find()
    res.status(200).json({
       sucess:true ,
       products
    })
}
 

//update products


export const updateProduct = async (req,res,next)=>{

  const product= await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
   })
 
   
   if(!product){
    return next(new HandleEroor("Product is not found",500))
   }

   res.status(200).json({
    sucess:true,
    product
   })
    

}


// delete Product


export const deleteProduct = async (req,res,next)=>{

 const product = await Product.findByIdAndDelete(req.params.id)
  
  if(!product){
    return next(new HandleEroor("Product is not found",500))
  }
  
  res.status(200).json({
    sucess:true,
    message:"Product deleted sucessfully"
  })
   



}


export const getSingleProduct = async (req,res,next)=>{

  const product = await Product.findById(req.params.id)
  if(!product){
    return next(new HandleEroor("Product is not found",500))
  }

  res.status(200).json({
    success:true,
    product

  })





}


