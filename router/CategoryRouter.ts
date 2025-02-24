import express,{Request,Response,Router} from 'express'
import * as CategoryController from '../controllers/CategoryController'
import { request } from 'http';

 const categoryRouter:Router = Router();

/**
  @usage : create category
  @method : post
  @params : no-params
  @url : http://localhost:9999/category
 */
categoryRouter.post("/",async(request:Request,response:Response)=>{
  await CategoryController.createCategory(request,response);
})

/**
  @usage : get all category 
  @method : get
  @params : no-params
  @url : http://localhost:9999/category
 */
categoryRouter.get("/",async(request:Request,response:Response)=>{
  await CategoryController.getAllCategory(request,response);
});

/**
  @usage : get category by id
  @method : get
  @params : categoryId
  @url : http://localhost:9999/category/:categoryId
 */
categoryRouter.get("/:categoryId",async(request:Request,response:Response)=>{
  await CategoryController.getCategoryById(request,response);
});

/**
  @usage : update category
  @method : put
  @params : categoryId
  @url : http://localhost:9999/category/:categoryId
 */
categoryRouter.put("/:categoryId",async(request:Request,response:Response)=>{
  await CategoryController.updateCategoryById(request,response);
});

/**
  @usage : update category status
  @method : put
  @params : categoryId
  @url : http://localhost:9999/category/deleteCategory/:categoryId
 */
categoryRouter.put("/deleteCategory/:categoryId",async(request:Request,response:Response)=>{
  await CategoryController.updateCatoryStatus(request,response);
})



export default categoryRouter