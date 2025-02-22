import mongoose,{Schema,Model,model} from 'mongoose'
import { EcomCategory } from '../model/EcomCategory'

const categorySchema = new Schema<EcomCategory>({
  category_name :{type:String,required:true},
  category_description:{type:String,required:true},
  category_logo:{type:String,required:true,default:"https://t3.ftcdn.net/jpg/01/79/08/04/360_F_179080419_QabhufMOEcJ8mIRqu340u8IHM7itrdc7.jpg"},
  isActive:{type:Boolean,default:true}
},{timestamps:true});

const categoryTable = model<EcomCategory>("Category",categorySchema);

export default categoryTable;