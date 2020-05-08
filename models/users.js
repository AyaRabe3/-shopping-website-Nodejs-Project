const mongoose=require('mongoose');
const _=require('lodash')
const bcrypt=require('bcryptjs')
const util=require('util')
const jwt=require('jsonwebtoken')
const saltRounds=7;
// const jwtSecret='thisIsMySecret';
 const jwtSecret =process.env.JWT_SECRET

////
// const sign=(payload,secret,options)=>new Promise((resolve,reject)=>{
//     jwt.sign(
//      payload,
//     secret,
//     options,
//     (err,token)=>{
//         //console.log(err,token)
//         if(err)return reject(err)
//         return resolve(token);
//     })
// })
//
 
const sign=util.promisify(jwt.sign)
const verify=util.promisify(jwt.verify)

const schema=[
{
email:{
    type:String,
    required:true,
    minlength:5
},
password:{
    type:String,
    required:true,
    minlength:4
},
secondpassword:{
    type:String,
    required:true,
    minlength:4
},
productId:{
    type:mongoose.ObjectId,
    ref:'Product'
}
}
]

 const userSchema=new mongoose.Schema(schema,
 {
     new:true,
     timestamps:true,
     toJSON:{
         virtuals:true,
         //extract
         transform:(doc)=>{
             return _.pick(doc,['id','email','products'])
         }
     }

 });


 /////hashing////////
userSchema.pre('save',async function(){
    const userInstance =this;
    
// if(this.isNew()){
   if(this.isModified('password'))
   {
     debugger;
     userInstance.password = await bcrypt.hash(userInstance.password,saltRounds)

}
if(this.isModified('secondpassword'))
{
    debugger;
  userInstance.secondpassword = await bcrypt.hash(userInstance.secondpassword,saltRounds)

}
})
 /////instance method//////////compare passwords

 //hereeeee
 userSchema.methods.comparePassword=async function(plainPassword){
    const userInstance =this;
 return await bcrypt.compare(plainPassword,userInstance.password)
     }
    
    // User.comparePassword
    //  userSchema.statics.comparePassword=async function)()

   ///////jwt////sign in///////

//   sign(
//   {userId:'123'},
//  'thisIsMySecret',
//   {expiresIn:'30m'})
//   .then(token=>{
//      console.log(token)
//  })
//  .catch( err=>{
//     console.log(err)

//  })
 
 
//////////////////
// verify(token,JWT_SECRET)
//  verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJpYXQiOjE1ODY1MTc4NzQsImV4cCI6MTU4NjUxOTY3NH0.fG3VYONsTa_YjqMDYn9EXL7G2JG5f7V65KVirAesHgA',
// 


// verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJpYXQiOjE1MTYyMzkwMjJ9.CycHEU-F-79MaxfcpeFBoszGukvDsnw0dj7-k3t96uM',
//  'thisIsMySecret')
//  .then(data=>{
//      console.log(data)
//  })
//  .catch(err=>{
//     console.log(err)
//     console.log("error in verify")

//  })
//  verify(token,jwtSecret)
//  .then(data=>{
//      console.log(data)
//  })
//  .catch(err=>{
//     console.log(err)
//     console.log("error in verify")

//  })
userSchema.methods.generateToken=function(expiresIn='60m'){
    const userInstance=this;
    return sign({userId:userInstance.id},jwtSecret,{expiresIn})
}


userSchema.statics.getUserFromToken=async function(token){
    try{
        const User=this;
        const payload=await verify(token,jwtSecret)
        //console.log("secret:",jwtSecret,"userId:",payload.userId)
        const currentUser=await User.findById(payload.userId);
        if(!currentUser)throw new Error("User Not Found")
        return currentUser

    }
    catch(err){
        console.log(err)
    }
}
/////////////////////////////////////////////

/////////////////////////////////


////////try again here ///////
// userSchema.statics.getUserFromToken=async function(token){
//     try{
//         const User=this;
//         const payload=await verify(token,jwtSecret)
//         console.log(jwtSecret)
//         const currentUser=await User.findById(payload.userId);
//         if(!currentUser)throw new Error("User Not Found")
//         return currentUser

//     }
//     catch(err){
//         console.log(err)
//     }
// }
///////////////////////







// userSchema.set('toJSON',{virtuals:true})
userSchema.virtual('products',{
    ref:'Product',
    refField:'productId',
    localField:'productId',
    foreignField:'_id'
})
// userSchema.virtual('category',{
//     ref:'Category',
//     localField:'categoryId',
//     foreignField:'_id '
// })

 const User=mongoose.model('User',userSchema)
 module.exports=User;
