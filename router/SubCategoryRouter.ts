import { request } from 'http';
import * as SubCategoryController from '../controllers/SubCategoryController'
import {Request,Response,Router} from 'express'

const subCategoryRouter:Router = Router();

/**
  @usage : create subCategory
  @method : post
  @params : no-params
  @url : http://localhost:9999/subCategory
 */
subCategoryRouter.post("/",async(request:Request,response:Response)=>{
  await SubCategoryController.createSubCategory(request,response);
});

/**
  @usage : get all subCategory
  @method : get
  @params : no-params
  @url : http://localhost:9999/subCategory
 */
subCategoryRouter.get("/",async(request:Request,response:Response)=>{
  await SubCategoryController.getAllSubCategory(request,response);
});

/**
  @usage : get subCategory by id
  @method : get
  @params : subCategoryId
  @url : http://localhost:9999/subCategory/:subCategoryId
 */
subCategoryRouter.get("/:subCategoryId",async(request:Request,response:Response)=>{
  await SubCategoryController.getSubCategoryById(request,response);
});

/**
  @usage : update subCategory by id
  @method : put
  @params : subCategoryId
  @url : http://localhost:9999/subCategory/:subCategoryId
 */
subCategoryRouter.put("/:subCategoryId",async(request:Request,response:Response)=>{
  await SubCategoryController.updateSubCategoryById(request,response);
});

/**
  @usage : update subCategory status by id
  @method : put
  @params : subCategoryId
  @url : http://localhost:9999/subCategory/deleteSubCategory/:subCategoryId
 */
subCategoryRouter.put("/deleteSubCategory/:subCategoryId",async(request:Request,response:Response)=>{
  await SubCategoryController.updateSubCategoryStatus(request,response);
});




export default subCategoryRouter;