import express,{Request,Response,Router} from 'express'
import * as CategoryController from '../controllers/CategoryController'

 const categoryRouter:Router = Router();

/**
  @usage : get all category 
  @method : get
  @params : no-params
  @url : http://localhost:9999/getAllCategory
 */

categoryRouter.get("/getAllCategory",async(request:Request,response:Response)=>{
  await CategoryController.getAllCategory(request,response);
});

export default categoryRouter