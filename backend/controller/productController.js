import Product from "../models/productsModels.js"
import HandleEroor from "../utils/handleError.js";
import handelAsyncError from "../Middleware/handelAsyncError.js";
import APIFunctionality from "../utils/apiFunctionlity.js";

//creating Products


export const createProducts = handelAsyncError (async(req,res,next)=>{
   console.log(req.user.id)
  req.body.user=req.user.id
  const product =  await Product.create(req.body)
  res.status(201).json({
    success:true,
    product
  })
    

})



//get all products


export const getAllproducts= handelAsyncError (async (req,res,next)=>{

   const resultPerPage=3
  const apiFeatures = new APIFunctionality(Product.find(),req.query)
  .search().filter()
  //getting fileterd query before pagination

  const filterdQuery = apiFeatures.query.clone()
  const productCount = await filterdQuery.countDocuments()
   

  //calculate total pages based on filtered count

  const totalpages=Math.ceil(productCount/resultPerPage)
  const page= Number(req.query.page) || 1

  if(page>totalpages && productCount>0){
    return next(new HandleEroor("This page does't exist",404))
  }
//apply pagination
apiFeatures.pagination(resultPerPage)
console.log(apiFeatures.pagination(resultPerPage));
 const products = await apiFeatures.query
 console.log(products);
 
if(!products || products.length===0){
  return next (new HandleEroor ("No product Fount",404))
}


   
    res.status(200).json({
       sucess:true ,
       products,
       productCount,
       totalpages,
       currentPage:page
    })
})
 

//update products


export const updateProduct = handelAsyncError (async (req,res,next)=>{

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
    

})


// delete Product


export const deleteProduct = handelAsyncError (async  (req,res,next)=>{

 const product = await Product.findByIdAndDelete(req.params.id)
  
  if(!product){
    return next(new HandleEroor("Product is not found",500))
  }
  
  res.status(200).json({
    sucess:true,
    message:"Product deleted sucessfully"
  })
   



})


//get single product


export const getSingleProduct = handelAsyncError(async (req,res,next)=>{

  const product = await Product.findById(req.params.id)
  if(!product){
    return next(new HandleEroor("Product is not found",500))
  }

  res.status(200).json({
    success:true,
    product

  })

})  


