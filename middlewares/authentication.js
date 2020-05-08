const User=require('../models/users')
const CustomError=require('../Helpers/customError')
module.exports= async(req,res,next) =>{
//  try{
     const token=req.headers.authorization;
     if(!token)throw  CustomError(401,'error authorization')
     const currentUser=await User.getUserFromToken(token);
      req.user=currentUser;
       next()
//  }
//  catch(err){
//  //  err.statusCode=401;
//  next(err);
//  }

}