import { EcomProduct } from "../model/EcomProduct";
import productTable from "../database/ProductSchema";
import {Request,Response} from 'express'
import mongoose, { mongo } from "mongoose";

/**
  @usage : create product
  @method : post
  @params : no-params
  @url : http://localhost:9999/product
 */
export const createProduct = async(request:Request,response:Response)=>{
  try{
    const {sub_category_id,product_name,product_description,product_image,product_images,product_price,product_brand,product_quantity,isActive} = request.body;

    if(!sub_category_id){
      return response.status(400).json({message:"sub_category_id is required!"});
    }
    if(!product_name || !product_description){
      return response.status(400).json({message:"product_name and product_description is required!"});
    }
    if(!product_price || !product_brand || !product_quantity){
      return response.status(400).json({message:"product price,brand and quantity is required"});
    }

    const theProduct:EcomProduct  = await new productTable({
      sub_category_id,
      product_name,
      product_description,
      product_image,product_images,
      product_brand,
      product_price,
      product_quantity
    }).save();

    if(theProduct){
      response.status(200).json({message:"product created Successfully",data:theProduct});
    }

  }catch(error){
    console.error("Error Creating Product",error);
    response.status(500).json({message:"Internal Server Error"});
  }
}

/**
  @usage : get all products
  @method : get
  @params : no-params
  @url : http://localhost:9999/product
 */
export const getAllProducts = async(request:Request,response:Response)=>{
  try{
    const products:EcomProduct[] = await productTable.find();
    if(products.length === 0){
      return response.status(404).json({message:"products not found!"});
    }
    response.status(200).json({products})
  }catch(error){
    console.error("Error Fetching Products",error);
    response.status(500).json({message:"Internal Server Error"});
  }
}

/**
  @usage : get product by id
  @method : get
  @params : productId
  @url : http://localhost:9999/product/:productId
 */
export const getProductById = async(request:Request,response:Response)=>{
  try{
    const {productId} = request.params;

    if(!mongoose.Types.ObjectId.isValid(productId)){
      return response.status(400).json({message:"Invalid Product Id"});
    }

    const productData:EcomProduct | null = await productTable.findById(productId);

    if(!productData){
      return response.status(404).json({message:"Product not Found!"});
    }
    response.status(200).json(productData)
  }catch(error){
    console.error("Error Fetching Product",error);
    response.status(500).json({message:"Internal Server Error"})
  }
}

/**
  @usage : update product by id
  @method : put
  @params : productId
  @url : http://localhost:9999/product/:productId
 */
export const updateProductById = async(request:Request,response:Response)=>{
 
  try{
    const {productId} = request.params;

    if(!mongoose.Types.ObjectId.isValid(productId)){
      return response.json(400).json({message:"Invalid ProductId"});
    }

    const{sub_category_id,product_name,product_description,product_image,product_images,product_price,product_brand,product_quantity,isActive} = request.body;

    const updatedData:EcomProduct | null = await productTable.findByIdAndUpdate(productId,{
      sub_category_id:sub_category_id,
      product_name:product_name,
      product_description:product_description,
      product_image:product_image,
      product_images:product_images,
      product_price:product_price,
      product_brand:product_brand,
      product_quantity:product_quantity,
      isActive:isActive
    },{new:true});

    if(!updatedData){
      return response.status(404).json({message:"Product not Found!"});
    }
    response.status(200).json({message:"product updated Successfully",data:updatedData});

  }catch(error){
    console.error("Error Updating Product",error);
    return response.status(500).json({message:"Internal Server Error"});
  }
}

/**
  @usage : update product status by id
  @method : put
  @params : productId
  @url : http://localhost:9999/product/deleteProduct/:productId
 */
export const updateProductStatus = async(request:Request,response:Response)=>{
  try{
    const {productId} = request.params;
    if(!mongoose.Types.ObjectId.isValid(productId)){
      return response.status(400).json({message:"Invalid Product Id!"});
    }

    const updateData:EcomProduct | null = await productTable.findByIdAndUpdate(productId,{
      isActive:false
    },{new:true});

    if(!updateData){
      return response.status(404).json({messaeg:"Product not found!"})
    }
    response.status(200).json({message:"Product Status updated Successfully"});
  }catch(error){
    console.error("Error UPdating product Status");
    response.status(500).json({message:"Internal Server Error"});
  }
}