import {Request,Response,Router} from "express"
import * as ProductController from '../controllers/ProductController'
import productTable from "../database/ProductSchema";


const productRouter:Router = Router();

/**
  @usage : create product
  @method : post
  @params : no-params
  @url : http://localhost:9999/product
 */
productRouter.post("/",async(request:Request,response:Response)=>{
  await ProductController.createProduct(request,response);
});

/**
  @usage : get all products
  @method : get
  @params : no-params
  @url : http://localhost:9999/product
 */
productRouter.get("/",async(request:Request,response:Response)=>{
  await ProductController.getAllProducts(request,response);
})

/**
  @usage : get product by id
  @method : get
  @params : productId
  @url : http://localhost:9999/product/:productId
 */
productRouter.get("/:productId",async(request:Request,response:Response)=>{
  await ProductController.getProductById(request,response);
})

/**
  @usage : update product by id
  @method : put
  @params : productId
  @url : http://localhost:9999/product/:productId
 */
productRouter.put("/:productId",async(request:Request,response:Response)=>{
  await ProductController.updateProductById(request,response);
})

/**
  @usage : update product status by id
  @method : put
  @params : productId
  @url : http://localhost:9999/product/deleteProduct/:productId
 */
productRouter.put("/deleteProduct/:productId",async(request:Request,response:Response)=>{
  await ProductController.updateProductStatus(request,response);
})

export default productRouter;