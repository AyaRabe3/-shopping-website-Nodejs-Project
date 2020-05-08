const express=require('express');
const {check,validationResult}=require('express-validator')
const router=express.Router();
const User=require('../models/users')
const authenticationMiddleware=require('../middlewares/authentication')
const ownerAuthorization=require('../middlewares/ownerAuthorization')
const validationMiddleware=require('../middlewares/validation')
const CustomError=require('../Helpers/customError')
const { validator } = require('express-validator');
const alert=require('alert-node');
// var popup = require('popups');

router.post('/register',
validationMiddleware(
check('email')
.exists()
.isEmail(),
check('password')
.matches(/\d/).withMessage('must contain numbers ')
.isLength({min:4}).withMessage('must be at least 4 char'),
 check('secondpassword')
.matches(/\d/).withMessage('must contain numbers ')
.isLength({min:4}).withMessage('must be at least 4 char')

),
async(req,res,next)=>{
// try{

const  errors=validationResult(req);
console.log("validation error :",errors)
const{email,password,secondpassword}=req.body;
console.log("email from node :",email)
// const email2 = email.isEmail();
if(password===secondpassword && email){
const user=new User({email,password,secondpassword})
await user.save();
res.json(user)
}
else if(errors){
//   popup.alert({
//     content: 'Wrong email or password!'
// })
alert("Wrong email or password!")
throw CustomError(401,'not matched password')
}


})
router.post('/login',async(req,res,next)=>{
    // try{
        const{email,password}=req.body;
        // const user=await User.findOne({username,password}).populate('posts')
        
        //  const user =await User.findOne({email}).populate('products')
        const user =await User.findOne({email})
        if(!user){throw new Error('wrong username or password ')}
        const isMatch= await user.comparePassword(password)
        if(!isMatch){throw new Error('wrong username or password ')}
        const token= await user.generateToken();
        res.json({user,token})
      console.log("token",token)
      console.log("welcomeee");
    
})

router.get('/',async(req,res,next)=>{
    try{
    const users= await User.find().populate('products')
    res.json(users);
    }
    catch(err){
        console.error(err)
        next(err)
    }

})
/////////////////////////////


debugger;
router.get("/:id",
authenticationMiddleware,
// ownerAuthorization,
async(req,res,next)=>{
  try{
    const {id}=req.params;
    const user=await User.findById(id,{
      // email,
      // product
    }).populate(['products'])
    res.json(user);
  }catch(err){
    console.error(err);
    next(err);
  }
})




router.get('/:id',()=>{

})

router.patch('/:id',()=>{


    
})
router.delete('/:id',()=>{

    
})



module.exports=router;