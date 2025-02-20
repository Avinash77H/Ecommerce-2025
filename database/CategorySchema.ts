import mongoose,{Schema,Model,model} from 'mongoose'
import { EcomCategory } from '../model/EcomCategory'

const categorySchema = new Schema<EcomCategory>({
  category_name :{type:String,required:true},
  category_description:{type:String,required:true},
  category_logo:{type:String,required:true,default:"https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"},
  isActive:{type:Boolean,default:false}
},{timestamps:true});

const categoryTable = model<EcomCategory>("Category",categorySchema);

export default categoryTable;