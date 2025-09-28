import mongoose  from "mongoose";

const productSchme = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim: true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product description"],
        trim: true
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Number"],
        maxLenght:[5,"Price cannot excces 7 digits"]
    },
     ratings:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
                url:{

                        type:String,
                      required:true

                }
            }
        
    ],
    category:{
               type:String,
               required:[true,"Please Enter Product category"],

    },
    stock:{
               type:Number,
              required:[true,"Please Enter Product Stock"],
              maxLenght:[5,"Price cannot excces 7 digits"]
              ,default:1
            } ,
    numberOfReviews:{
        type:Number,
        default:0

    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comments:{
                type:String,
                required:true

            }

        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

  
})

export default mongoose.model("Product",productSchme)