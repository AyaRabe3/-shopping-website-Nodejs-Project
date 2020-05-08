const Product=require('../models/products');
const User=require('../models/users');
const CustomError=require('../Helpers/customError')
require('express-async-errors');
module.exports =async(req,res,next)=>{
    //const {params :{id:postId},user:{id:userId}}=req;
  //  try{ 
    const productId=req.params.id;
    // const userId=req.user.id;
    const {user: {id: userId}} = req;
    console.log("iddddd",userId);
    const product=await Product.findById(productId);
    console.log("product user:",product.userId)
    if(!product.userId.equals(userId))
    {
        //const err=new CustomError('Not Authorized');
        //err.statusCode=403;
        throw CustomError(404,'Not Authorized');
    }
    next();
// }
// catch(err)
// {
//     next(err)
// }
}







