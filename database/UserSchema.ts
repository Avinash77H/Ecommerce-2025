import mongoose from 'mongoose';
import { EcomUser } from '../model/EcomUser';

const  userSchema = new mongoose.Schema<EcomUser>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    imageUrl:{type:String,required:true},
    isAdmin: {type: Boolean, default: false}
},{timestamps:true});

const userTable = mongoose.model<EcomUser>('User', userSchema);
export default userTable;
