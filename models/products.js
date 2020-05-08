
const mongoose=require('mongoose');
const _ =require('lodash');
const productSchema=new mongoose.Schema({

name:{
     type:String,
     required:true,
     minlength:5

},
description:{
     type:String,
     required:true,
     minlength:10
    
},
price:{
    type:Number,
    required:true,
    // minlength:10
},discount:{
    type:Number
},status:{
    type:String
},
payment:{
    type:String
    
},
tags:{
    type:String

},
image:{
    type:String
}
,
userId:{
    type:mongoose.ObjectId,
    ref:'User'

},
categoryId:{
    type:mongoose.ObjectId,
    ref:'Category'

}
}



,{
    new:true,
    timestamps:true,
    toJSON:{
        virtuals:true,
        transform:(doc)=>{
            return _.pick(doc,['id','name','description','price','discount','status','payment','tags','image','user','category'])
        }
    }

})
productSchema.virtual('user',{
    ref:'User',
    localField:'userId',
    foreignField:'_id'

})
productSchema.virtual('category',{
    ref:'Category',
    localField:'categoryId',
    foreignField:'_id'

})
 const  Product=mongoose.model('Product',productSchema);
 module.exports=Product