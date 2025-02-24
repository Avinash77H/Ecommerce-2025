import mongoose from "mongoose";
import { EcomProduct } from "../model/EcomProduct";

const productSchema = new mongoose.Schema({
  sub_category_id:{type:String,required:true},
  product_name : {type:String,required:true},
  product_description:{type:String,required:true},
  product_image:{type:String,default:"https://rahulindesign.websites.co.in/twenty-nineteen/img/defaults/product-default.png"},
  product_images:{type:[String],default:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyrhEb7wbEnzeHneLlfCe3aX-shOhqBPLFZueevWSZC6qCJWH7_HYDsXideQwOCyZxhyA&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyrhEb7wbEnzeHneLlfCe3aX-shOhqBPLFZueevWSZC6qCJWH7_HYDsXideQwOCyZxhyA&usqp=CAU"]},
  product_price:{type:Number,required:true},
  product_brand:{type:String,required:true},
  product_quantity:{type:Number,required:true},
  isActive:{type:Boolean,default:true}
},{timestamps:true});

const productTable = mongoose.model<EcomProduct>('product',productSchema);

export default productTable;