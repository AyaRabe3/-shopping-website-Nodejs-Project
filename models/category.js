const mongoose=require('mongoose');
const _ =require('lodash');
const categorySchema=new mongoose.Schema({

name:{
     type:String,
     required:true,
     minlength:5

},
// userId:{
//     type:mongoose.ObjectId,
//     ref:'User'

// },
// productId:{
//     type:mongoose.ObjectId,
//     ref:'Product'

// }

}

,{
    timestamps:true,
    toJSON:{
        virtuals:true,
        transform:(doc)=>{
            return _.pick(doc,['id','name'/*,'product'*/])
        }
    }

})
// productSchema.virtual('user',{
//     ref:'User',
//     localField:'userId',
//     foreignField:'_id'

// })
// categorySchema.virtual('product',{
//     ref:'Product',
//     localField:'productId',
//     foreignField:'_id'

// })
 const Category=mongoose.model('Category',categorySchema);
 module.exports=Category