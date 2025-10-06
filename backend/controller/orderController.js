
import Order from "../models/orderModel.js"
import Product from "../models/productsModels.js"
import User from "../models/userModel.js"
import HandleEroor from "../utils/handleError.js";
import handelAsyncError from "../Middleware/handelAsyncError.js";

//create new order

export const createNewOrder = handelAsyncError(async(req,res,next)=>{
   console.log("test");
   
    const {shippingInfo,orderItems,paymentInfo,
        itemPrice,taxPrice,shippingPrice,
        totalPrice}=req.body

        const order=await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id

        })
        res.status(200).json({
            success:true,
            order
        })

})

//GET A SINGLE ORDER

export const getSingelOrder=handelAsyncError(async(req,res,next)=>{
    console.log("hello");
    
    const order=await Order.findById(req.params.id).populate('user',"name email")
    if(!order) return next(new HandleEroor("No order found",404))
    res.status(200).json({
    success:true,
    order
    })
    
})

//ALL MY ORDER 

export const allMyorders=handelAsyncError(async(req,res,next)=>{
    
    const orders=await Order.find({user:req.user._id})
    if(!orders) return next(new HandleEroor("No order found",404))
    res.status(200).json({
    success:true,
    orders
    })
})


//GETTING ALL ORDERS

export const getAllOrders=handelAsyncError(async(req,res,next)=>{

    const orders=await Order.find()
    let totalAmount =0
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    if(!orders) return next(new HandleEroor("No order found",404))
    res.status(200).json({
    success:true,
    orders,
    totalAmount
    })
})

//Update order status

export const updateOrderStatus=handelAsyncError(async(req,res,next)=>{

 const order=await Order.findById(req.params.id)
    if(!order) return next(new HandleEroor("No order found",404))
    if(order.status==='Delivered') return next(new HandleEroor("This order is already Deliverd",404))
    await Promise.all(order.orderItems.map(item=>updateQuantity(item.product,item.quantity)
    ))
    order.orderStatus=req.body.status
    if(order.orderStatus==='Delivered'){
        order.deliverAt=Date.now()
    }
    await order.save({validateBeforeSave:false})
        
   
    res.status(200).json({
    success:true,
    order
    })
})

async function updateQuantity(id,quantity) {
    
    const product= await product.findById(id)
      if(!product) return next(new HandleEroor("No order found",404))
       product.stock-=quantity
    await product.save({validateBeforeSave:false})
    }


    //Delete order 8:22

    export const deleteOrder=handelAsyncError(async(req,res,next)=>{

    const order=await Order.findById(req.params.id)
     if(!order) return next(new HandleEroor("No order found",404))
await Order.deleteOne({_id:req.params.id})
   
    res.status(200).json({
    success:true,
   message:"Order Deleted successfully"
    })
})