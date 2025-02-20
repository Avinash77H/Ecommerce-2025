import express,{Request,Response} from 'express';
import mongoose from 'mongoose';
import categoryTable from "../database/CategorySchema";


  /**
  @usage : get all category 
  @method : get
  @params : no-params
  @url : http://localhost:9999/getAllCategory
 */
export const getAllCategory = async(request:Request,response:Response)=>{
 try{
  const userData = await categoryTable.find();
  if(userData.length === 0){
    return response.status(404).json({message:"No Category Found!"});
  }
  response.status(200).json(userData)
 }catch(error){
  response.status(500).json({error:(error as Error).message});
 }
}

/**
  @usage : get category by id
  @method : get
  @params : categoryId
  @url : http://localhost:9999/getCategory/:categoryId
 */
export const getCategoryById = async(request:Request,response:Response)=>{
  const categoryId = request.params.categoryId;
 try{
  const mongoId = new mongoose.Types.ObjectId(categoryId);
  const categoryData = await categoryTable.findById(mongoId);
  if(!categoryData){
    return response.status(404).json({message:"Category not found"});
  }
  response.status(200).json(categoryData);
 }catch(err){
  response.status(500).json({message:(err as Error).message})
 }

}

