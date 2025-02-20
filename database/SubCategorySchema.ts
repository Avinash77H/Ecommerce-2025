import { EcomSubCategory } from "../model/EcomSubCategory";
import {Schema,model} from 'mongoose'

const subCategorySchema = new Schema<EcomSubCategory>({
  category_id : {type:String,required:true,unique:true},
  name : {type:String,required:true},
  description : {type:String,required:true},
  logo : {type:String,default:"https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"},
  isActive : {type:Boolean,default:false},
  createdAt: {type:Date},
  updatedAt:{type:Date}
})

const subCategoryTable = model<EcomSubCategory>("SubCategory",subCategorySchema);

export default subCategoryTable;