const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    Name: String,
    Age: Number,
    Department: String,
    Position: String,
    Salary: Number,
    Contact: Number
})

const UserModel=mongoose.model("users", UserSchema)
module.exports=UserModel