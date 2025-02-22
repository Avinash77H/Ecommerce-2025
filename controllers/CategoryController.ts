import express,{Request,Response} from 'express';
import mongoose from 'mongoose';
import categoryTable from "../database/CategorySchema";
import { EcomCategory } from '../model/EcomCategory';


  /**
  @usage : get all category 
  @method : get
  @params : no-params
  @url : http://localhost:9999/category
 */
export const getAllCategory = async(request:Request,response:Response)=>{
 try{
  const userData:EcomCategory[]  = await categoryTable.find();
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
  @url : http://localhost:9999/category/:categoryId
 */
export const getCategoryById = async(request:Request,response:Response)=>{
  const categoryId = request.params.categoryId;
 try{
  if(!mongoose.Types.ObjectId.isValid(categoryId)){
    return response.status(400).json({message:"Invalid CategryId !"});
  }
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

/**
  @usage : create category
  @method : post
  @params : no-params
  @url : http://localhost:9999/category
 */
export const createCategory = async(request:Request,response:Response)=>{
try{
  const {category_name,category_description,category_logo,isActive} = request.body

  if(!category_name || !category_description){
    return response.status(400).json({msg:"category_name and category_description required!"})
  }

  const theCategory:EcomCategory | undefined | null = await new categoryTable({
    category_name,
    category_description,
    category_logo,
    isActive
  }).save();
  response.status(201).json({msg:"Category Created Sucessfully"});
}catch(error){
  console.error("Error creating category:",error);
  response.status(500).json({msg:"Internal Server Error"});
}
}

/**
  @usage : update category
  @method : put
  @params : categoryId
  @url : http://localhost:9999/category/:categoryId
 */
export const updateCategoryById = async(request:Request,response:Response)=>{
  try{
    const data = request.body;
    const {categoryId} = request.params;
    if(!mongoose.Types.ObjectId.isValid(categoryId)){
        return response.status(400).json({message:"Invalid category ID"});
    }
    if(!data || Object.keys(data).length === 0){
      return response.status(400).json({message:"Request body is Empty"});
    }
    const mongoId = new mongoose.Types.ObjectId(categoryId);

    const theCategory:EcomCategory | null = await categoryTable.findByIdAndUpdate(mongoId,{
      category_name:data.category_name,
      category_description:data.category_description,
      category_logo:data.category_logo,
      isActive:data.isActive
    },{new:true});

    if(!theCategory){
      return response.status(404).json({message:"Category not found !"});
    }
   
      response.status(200).json({message:"Category Updated Successfully",data:theCategory});
 
  }catch(error){
    console.error("Error updating category",error);
    response.status(500).json({message:"Internal Server Error:"});
  }
}

/**
  @usage : delete category
  @method : put
  @params : categoryId
  @url : http://localhost:9999/category/deleteCategory/:categoryId
 */
export const deleteCategoryById = async(request:Request,response:Response)=>{
  try{
    const {categoryId} = request.params;
   
    if(!mongoose.Types.ObjectId.isValid(categoryId)){
      return response.status(400).json({message:"Invalid category id !"});
    }

    const mongoId = new mongoose.Types.ObjectId(categoryId);

    const categoryData:EcomCategory | null = await categoryTable.findById(mongoId);

    if(!categoryData){
      return response.status(404).json({message:"category not found"})
    }

    const updatedData:EcomCategory | null = await categoryTable.findByIdAndUpdate(mongoId,{
      isActive:false
      // ...categoryData,isActive:categoryData.isActive = false
    },{new:true});

    response.status(200).json({message:"Category Delete Sucessfully"});
    
  }catch(error){
    console.error("error deleting category:",error);
    response.status(500).json({message:"Internal Server Error"})
  }
}