import express,{Request,Response} from 'express';
import { EcomUser } from '../model/EcomUser';
import userTable from '../database/UserSchema';
import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';

/**
 * @usage : register user
 * @method : post
 * @params : no params
 * @url : http://localhost:9999/users/register
 */
export const registerUser = async (request: Request, response: Response) => {

  const errors = validationResult(request);
  if(!errors.isEmpty()){
    return response.status(400).json({errors: errors.array()});
  }
 try{

  const { username, email, password } = request.body;

  // check if user already exists
  const userExists = await userTable.findOne({email:email});
  if(userExists){
    return response.status(400).json({message: 'Email already exists'});
  }

  // password encryptionz
  const salt = await bcryptjs.genSalt(10);
  const hashedpassword = await bcryptjs.hash(password,salt);

  // gravatar image
  const imageUrl = gravatar.url(email,{
    size: '200',
    rating : 'pg',
    default : 'mm'
  })



  const userData : EcomUser = {
    username,
    email,
    password:hashedpassword,
    imageUrl: imageUrl,
    isAdmin :false
  }

 const theUserObj = await new userTable(userData).save();
  if(theUserObj){
   return response.status(201).json({data:theUserObj,message: 'User created successfully'});
  }
 }catch(error:any){
  return response.status(500).json({
    error:error.message
  })
 }
}

/**
 * @usage : login user
 * @method : post
 * @params : no params
 * @url : http://localhost:9999/users/login
 */
export const loginUser = async(request:Request,response:Response)=>{
  const errors = validationResult(request);
  if(!errors.isEmpty()){
    return response.status(400).json({
      error:errors.array
    })
  }

 try{
  const {email,password} = request.body;

  const userObj = await userTable.findOne({email:email});
  if(!userObj){
    return response.status(400).json({
      message:'Invalid email'
    })
  }

  const validPassword:Boolean = await bcryptjs.compare(password,userObj.password);
  if(!validPassword){
    return response.status(400).json({
      message:"Invalid password"
    })
  }

  const secretKey:string | undefined = process.env.JWT_SECRET_KEY
  const payload:any = {
    user:{
      id:userObj._id,
      email:userObj.email 
    }
  }

  if(secretKey && payload){
    jwt.sign(payload,secretKey,{expiresIn:10000000},(error,encoded)=>{
      if(error){
        throw error
      }
      if(encoded){
        return response.status(200).json({
          data:userObj,
          token:encoded,
          message:"login successfully"
        })
      }
    })
  }

 }catch(error){
  return response.status(500).json({
    error:"Internal Server Error"
  })
 }
}