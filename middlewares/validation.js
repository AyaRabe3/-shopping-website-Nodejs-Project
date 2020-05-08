const {validationResult}=require('express-validator');
const CustomError=require('../Helpers/customError')
module.exports= (...validationChecks)=>
async(req,res,next)=>{
//  try{ 
    const promises=validationChecks.map(
        validationCheck=>validationCheck.run(req)
    )
    await Promise.all(promises)
    
 const errors=validationResult(req)
 if(!{errors}.length){
     return next();
 }
     throw  CustomError('401','error at validation',errors)

// }
// catch(err){
//     next(err)
// }
}
