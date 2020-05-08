const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI)

.then(()=>{
    console.log("connected to database")
})
.catch((err)=>{
    console.error(err);
    process.exit(1);

})