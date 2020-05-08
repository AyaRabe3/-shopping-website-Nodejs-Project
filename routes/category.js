const express=require('express');
const router=express.Router();
const Category=require('../models/category')
const ownerAuthorization=require('../middlewares/ownerAuthorization')
const authenticationMiddleware=require('../middlewares/authentication')
const CustomError=require('../Helpers/customError')

router.post('/',authenticationMiddleware,
async(req,res,next)=>{
    // try{
        const {name/*,productId*/}=req.body;
        const category=new Category({name/*,productId*/})
        await category.save();
        res.json(category)

    // }
    // catch(err){
      //err.statusCode=422
      throw CustomError(422,'cant create category ')
    //   next(err)
    // }

})

router.get('/',async(req,res,next)=>{
try{
    const category= await Category.find() //.populate('product')
    res.json(category)
}
catch(err){
    statusCode=400
    next(err)
}
})

// router.get('/:id',()=>{

// })


// router.patch('/:id',authenticationMiddleware,
// ownerAuthorization,
// (req,res,next)=>{

//     res.send("my post")
// })

// router.delete('/:id',()=>{

    
// })

module.exports=router;