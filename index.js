require('dotenv').config()
const express=require('express');
const port= process.env.PORT||5000;
const app=express();
const userRouter=require('./routes/users');
const productsRouter=require('./routes/products');
const categoryRouter=require('./routes/category');
require('express-async-errors')
var cors=require('cors')
const db=require('./db');

app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/users',userRouter);
app.use('/products',productsRouter);
app.use('/category',categoryRouter);
app.use((err,req,res,next)=>
 {   
     console.log(err)
     const statusCode=err.statusCode|| 3000;
     if(statusCode>=500){
       return res.status(statusCode).json({
            message:" something went wrong",
            type:"server errorrr type",
            details:[]
        })
     }
        res.status(statusCode).json({
            message:err.message,
            type:err.type,
            details:err.details


     })
 
    })

 app.listen(port,()=>{
    //  console.log("hi 3000")
     console.log(`app listening at port :${port}`)
 })