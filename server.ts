import express,{Application,Request,Response} from 'express'
import categoryRouter from './router/CategoryRouter';
import subCategoryRouter from './router/SubCategoryRouter';
import productRouter from './router/ProductRouter';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config({path:"./.env"});

const app:Application = express();
const port:number | undefined | null = Number(process.env.PORT) || 5000;
const db_url:string | undefined | null = process.env.DB_URL;
const db_name : string | undefined | null = process.env.DB_NAME;

app.use(express.json());

// category Router
app.use("/category",categoryRouter);

// subCategory Router
app.use("/subCategory",subCategoryRouter);

// product Router
app.use("/product",productRouter);

if(port){
  app.listen(port,()=>{
    if(db_url && db_name){
      mongoose.connect(db_url,{dbName:db_name})
      .then(()=>{
        console.log("DB Connected Successfully ✅")
      })
      .catch(()=>{
        console.log("DB Not Connect ❌")
      })
    }
    console.log(`server run on http://localhost:${port}`);
  })
}



