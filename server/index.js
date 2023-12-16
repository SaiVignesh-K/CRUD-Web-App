const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel=require('./models/Users')

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Tester:Test@cluster0.uj51vhq.mongodb.net/CRUD?retryWrites=true&w=majority").then(()=>{
    console.log("Connection Succesful");
}).catch((e)=>{
    console.log(e);
})

app.get("/",(req,res)=>{
    UserModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.catch(err))
})

app.get("/GetUser/:id",(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.catch(err))
})

app.put("/UpdateEmployee/:id",(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        Name:req.body.Name,
        EmployeeID:req.body.EmployeeID,
        Department:req.body.Department,
        Position:req.body.Position,
        Salary:req.body.Salary,
        Contact:req.body.Contact
    })
    .then(users=>res.json(users))
    .catch(err=>res.catch(err))
    
})

app.delete("/DeleteEmployee/:id",(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.catch(err))
})

app.post("/AddEmployee",(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})




app.listen(3001,()=>{
    console.log("server is running")
})
