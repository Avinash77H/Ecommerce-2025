import { EcomSubCategory } from "../model/EcomSubCategory";
import {Schema,model} from 'mongoose'

const subCategorySchema = new Schema<EcomSubCategory>({
  category_id : {type:String,required:true,unique:true},
  sub_category_name : {type:String,required:true},
  sub_category_description : {type:String,required:true},
  sub_category_logo : {type:String,default:"https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb3717fbf9cec_Product_Default.svg"},
  isActive : {type:Boolean,default:true},
  createdAt: {type:Date},
  updatedAt:{type:Date}
})

const subCategoryTable = model<EcomSubCategory>("SubCategory",subCategorySchema);

export default subCategoryTable;