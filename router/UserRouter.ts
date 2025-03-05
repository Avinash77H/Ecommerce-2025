import express,{Request,Response,Router} from 'express';
import * as UserController from '../controllers/UserController'
import { body } from 'express-validator';

const userRouter:Router = Router();

/**
 * @usage : register user
 * @method : post
 * @params : no params
 * @url : http://localhost:9999/users/register
 */
userRouter.post('/register',[
  body('username').not().isEmpty().withMessage('username is Required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isStrongPassword().withMessage('Strong password is Required')
],async(request:Request,response:Response)=>{
  await UserController.registerUser(request,response);
})

/**
 * @usage : login user
 * @method : post
 * @params : no params
 * @url : http://localhost:9999/users/login
 */
userRouter.post('/login',[
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isStrongPassword().withMessage('Strong password is Required')
],async(request:Request,response:Response)=>{
  await UserController.loginUser(request,response);
})


export default userRouter;