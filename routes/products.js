const express=require('express');
const router=express.Router();
const Product=require('../models/products')
const Category=require('../models/category')
const ownerAuthorization=require('../middlewares/ownerAuthorization')
const authenticationMiddleware=require('../middlewares/authentication')
const CustomError=require('../Helpers/customError')
router.post('/',
authenticationMiddleware,
async(req,res,next)=>{
    try{
        // const {id}=req.params;
        // console.log("id",id)
        const {name,description,price,discount,status,payment,image,tags,userId,categoryId}=req.body;
        const product=new Product({name,description,price,discount,status,payment,image,tags,userId,categoryId})
        await product.save();
        res.json(product)
          console.log("add product done")
    }
    catch(err){
      err.statusCode=422
    //   next()
    //   throw CustomError(422,'cant create post ')
      next(err)
    }
})

//////get all products///////
router.get('/',async(req,res,next)=>{
try{
    const product= await Product.find().populate(['user','category'])
    res.json(product)
}
catch(err){
    statusCode=400
    next(err)
}

})
///////////////////hereeeeee get product by id ///////
// debugger;
router.get('/:id',
   authenticationMiddleware,
//    ownerAuthorization,
 async(req,res,next)=>{
    const {id}=req.params;
    console.log(id)
    const product=await Product.findById(id);
    res.status(200).json(product)
    next()
     
     }
    );

    
///////////////////////search by post method/////////////////////////////
// router.post('/search',
// //    authenticationMiddleware,
//  async(req,res,next)=>{
//     //  const {name}=req.params
//     //  if(req.params.name===req.user.name){
//     //     console.log("product:",name)
//     // // 
//      Product.find({}).exec()
//      .then(all=>{
//          res.send(
             
//                  all.filter(product=>{
//                      if(product.name.toLowerCase()
//                      .includes(req.body.name.toLowerCase()))
//                      return product;

//                  })
//              )
//          console.log("searching done")
         
//                 })
//     .catch(err=>{
//         console.error(err);
//         next(err);
//     })    
//      })

////////search by name by get////////////

router.get('/search/:searchProduct',
//    authenticationMiddleware,
 async(req,res,next)=>{
     const {searchProduct}=req.params  
     console.log(searchProduct)
      const products= await Product.find();
     let product= products.filter(product=>{
        if(product.name.includes(searchProduct))
        return product
      })
     
        res.json(product)
         console.log("searching done")
         
     })
    
    








     
////////////////////////////////////////////////////
    // router.get('/:userId',
    // authenticationMiddleware,
    // (req,res,next)=>{
    //     try{
    //      const userId=Number(req.params.id)
    //      res.json(userId);
    //     }
    //    //  next()
    //  catch(err){
    //        console.error(err);
    //        next(err);
    //    }    
    //    });

    //////get by category/////////////
//     router.get('/:id',
// //    authenticationMiddleware,
// //    ownerAuthorization,
//    async(req,res,next)=>{
   
//     const {id}=req.params;
//     console.log(id)
//     const product=await Product.find();
//     console.log(product)
//     if(product.categoryId===id){
//         // product.filter(categoryId=>categoryId==id)
//         console.log(product)
//         // res.status(200).json(product)
//     }
      
//       next()
     
//      }
//     );
////////////////////////////edite
// debugger;
///////////////////////////////////here///////////////////
router.patch('/:id',
authenticationMiddleware,
//   ownerAuthorization,
    async (req, res, next) => {
        const {id} = req.params;
        const {name,description,price,discount,status,payment,image,tags,userId,categoryId} = req.body;
        const product = await Product.findByIdAndUpdate(id, {
            name,description,price,discount,status,payment,image,tags,userId,categoryId},
         {
            new: true,
            runValidators: true,
            omitUndefined: true
        });
        res.status(200).json({
            message: "product Edit Succssfully",
            product
        })
        console.error(" cant edite")
        next()
    })











///////////

// router.delete('/:id',
//  authenticationMiddleware,
//  ownerAuthorization,
//  async(req,res,next)=>{
//     try{
//     const{id}=req.params;
//     const product=await Product.findByIdAndDelete(id);
//     res.json(product);
    
//     }catch(err){
//     console.error(err)
//     console.error("can`t delete")
//     next(err);
//     }})
  
 
// /////////////////////////////hereeeee///////////////
 router.delete('/:id',
    authenticationMiddleware,
    //  ownerAuthorization, 
    async (req, res) => {
    console.log("delete")
    const { id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product)
   
})



 

/////////////////////////////////////////////////
// router.patch('/:id',authenticationMiddleware,
// ownerAuthorization,
// (req,res,next)=>{

//     res.send("my post")
// })

// router.delete('/:id',()=>{

    
// })

module.exports=router;