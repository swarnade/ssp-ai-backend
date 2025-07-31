const mongoose=require('mongoose');
const ConnectionString = process.env.MongoDB_String 
const connectDB=(()=>{
    mongoose.connect(ConnectionString).then(()=>{
    console.log("Database Connected")}).catch(()=>{
        console.log("Database Error")
    });
})
module.exports=connectDB;