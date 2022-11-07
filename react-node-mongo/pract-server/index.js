const express= require('express')
const mongo=require('mongodb')
const app=express()

// app.get('/',(req,res)=>{
//     res.send("Hello Javascript")
// }).listen(3000)

let data={
    firstName:"Sachin",
    lastName:"Tendulkar",
    runs:20000,
    loc:"Mumbai"
}
app.use(express.json())

app.post('./create',(req,res)=>{
    // res.send(data)
    res.send("hello")
    // console.log(data)
}).listen(4000)