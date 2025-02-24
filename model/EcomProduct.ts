export interface EcomProduct {
  sub_category_id:string,
  product_name:string,
  product_description:string,
  product_image:string,
  product_images:string[],
  product_price:number,
  product_brand:string,
  product_quantity:number,
  isActive:boolean,
  createdAt : Date,
  updatedAt : Date
}