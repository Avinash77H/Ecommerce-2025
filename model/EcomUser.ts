export interface EcomUser{
  username : string,
  password : string,
  email : string,
  imageUrl : string,
  isAdmin : boolean,
  createdAt? : Date,
  updatedAt? : Date
}