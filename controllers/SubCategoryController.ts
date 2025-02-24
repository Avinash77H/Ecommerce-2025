import subCategoryTable from "../database/SubCategorySchema";
import {Request,Response} from 'express'
import { EcomSubCategory } from "../model/EcomSubCategory";
import mongoose from "mongoose";

/**
  @usage : create subCategory
  @method : post
  @params : no-params
  @url : http://localhost:9999/subCategory
 */
export const createSubCategory = async(request:Request,response:Response)=>{
  try{
    const {category_id,sub_category_name,sub_category_description,sub_category_logo,isActive} = request.body;

    if(!category_id){
      return response.status(400).json({message:"category_id required!"});
    };
    if(!sub_category_name || !sub_category_description){
      return response.status(400).json({message:"sub_category_name or sub_category_description required !"});
    };

    const theSubCategory:EcomSubCategory = await new subCategoryTable({
      category_id,
      sub_category_name,
      sub_category_description,
      sub_category_logo,
      isActive
    }).save()

    if(theSubCategory){
       response.status(200).json({message:"subCategory created sucessfully",data:theSubCategory});
    };
   
  }catch(error){
    console.error("Error creating subCategory",error);
    response.status(500).json({message:"Internal Server Error"});
  };
}

/**
  @usage : get all subCategory
  @method : get
  @params : no-params
  @url : http://localhost:9999/subCategory
 */
export const getAllSubCategory = async(request:Request,response:Response)=>{
  try{
    const theSubCategory:EcomSubCategory[] = await subCategoryTable.find();

    if(theSubCategory.length === 0){
      return response.status(404).json({message:"subCategory not found"});
    }
    response.status(200).json(theSubCategory);
  }catch(error){
    console.error("Error fetching subCategory:",error);
    response.status(500).json({message:"Internal Server Error"});
  }
}

/**
  @usage : get subCategory by id
  @method : get
  @params : subCategoryId
  @url : http://localhost:9999/subCategory/:subCategoryId
 */
export const getSubCategoryById = async(request:Request,response:Response)=>{
  try{
    const {subCategoryId} = request.params;
    if(!mongoose.Types.ObjectId.isValid(subCategoryId)){
      return response.status(400).json({message:"Invalid Id"});
    }

    const theSubCategory:EcomSubCategory | null = await subCategoryTable.findById(subCategoryId);

    if(!theSubCategory){
      return response.status(404).json({message:"Catogary not found"})
    };

    response.status(200).json(theSubCategory);

  }catch(error){
    console.log("Error Fetching subCategory",error);
    response.status(500).json({message:"Internal Server Error"});
  }
}

/**
  @usage : update subCategory by id
  @method : put
  @params : subCategoryId
  @url : http://localhost:9999/subCategory/:subCategoryId
 */
export const updateSubCategoryById = async(request:Request,response:Response)=>{
  try{
    const {subCategoryId} = request.params;
    if(!mongoose.Types.ObjectId.isValid(subCategoryId)){
      return response.status(400).json({message:"Invalid Id"});
    }
    const {sub_category_name,sub_category_description,sub_category_logo,sub} = request.body;

  const updatedData:EcomSubCategory | null = await subCategoryTable.findByIdAndUpdate(subCategoryId,{
    sub_category_name:sub_category_name,
    sub_category_logo:sub_category_logo,
    sub_category_description:sub_category_description
  },{new:true});

  if(!updatedData){
    return response.status(404).json({message:"subCategory not found"});
  }
  
   response.status(200).json({message:"subCategory Updated Successfully",data:updatedData});


  }catch(error){
    console.log("Error updating subCategory");
   response.status(500).json({message:"Internal Server Error"});
  }
}

/**
  @usage : update subCategory status by id
  @method : put
  @params : subCategoryId
  @url : http://localhost:9999/subCategory/deleteSubCategory/:subCategoryId
 */
export const updateSubCategoryStatus = async(request:Request,response:Response)=>{
  try{
    const {subCategoryId} = request.params;
    if(!mongoose.Types.ObjectId.isValid(subCategoryId)){
      return response.status(400).json({message:"Invalid Id"});
    }

    const updatedData:EcomSubCategory | null = await subCategoryTable.findByIdAndUpdate(subCategoryId,{isActive:false},{new:true});

    if(!updatedData){
      return response.status(404).json({message:"subCategory not found !"});
    }
    response.status(200).json({message:"subCategory Status updated Successfully",
      data:updatedData
    });
  }catch(error){
    console.log("Error updating subCategory Status",error);
    response.status(500).json({message:"Internal Server Error"});
  }
}