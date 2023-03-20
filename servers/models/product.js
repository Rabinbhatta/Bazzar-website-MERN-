import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    img_url:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    product_type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

    
})

export const Product = mongoose.model("Product",productSchema)

