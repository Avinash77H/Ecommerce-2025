import { EcomSubCategory } from "../model/EcomSubCategory";
import {Schema,model} from 'mongoose'

const subCategorySchema = new Schema<EcomSubCategory>({
  category_id : {type:String,required:true,unique:true},
  sub_category_name : {type:String,required:true},
  sub_category_description : {type:String,required:true},
  sub_category_logo : {type:String,default:"https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"},
  isActive : {type:Boolean,default:true},
  createdAt: {type:Date},
  updatedAt:{type:Date}
})

const subCategoryTable = model<EcomSubCategory>("SubCategory",subCategorySchema);

export default subCategoryTable;