import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
userId:{
    type:String,
    require:true,
},
orders:{
    type:Array,
    require:true,
   
}


})

 export const Orders = mongoose.model("Orders",OrderSchema); 