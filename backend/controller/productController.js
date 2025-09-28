import Product from "../models/productsModels.js"

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


export const updateProduct = async (req,res)=>{

    let product = await Product.findById(req.params.id)
   if(!product){
    return res.status(500).json({
        success: false,
        message:"Product is Not found"
    })
   }
   
   product= await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
   })
   res.status(200).json({
    sucess:true,
    product
   })
    

}



