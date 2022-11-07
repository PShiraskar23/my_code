var express=require('express')
var app=express()
var mongo=require('mongodb')


app.get('/',(req,res)=>{
    res.send("Hello World")
}).listen(5500)

app.post('/post',(req,res)=>{
let name=req.query.name
let loc=req.query.loc

res.send(`Name : ${name} , Location: ${loc}` )
})

app.post('/insert',(req,res)=>{
    let client=mongo.MongoClient
    client.connect('mongodb://localhost:27017',(err,server)=>{
        if(err){
            res.send(err)
        }else{
            let db=server.db('company')
            let collection=db.collection('employee')
            collection.find({}).toArray((e,s)=>{
                if(e){
                    res.send(e)
                }else{
                    res.send(s)
                }
            })
        }
    })
})


app.put('/updtae',(req,res)=>{
    let client=mongo.MongoClient
    client.connect('mongodb://localhost:27017',(err,server)=>{
        if(err){
            res.send(err)
        }else{
            let db=server.db('company')
            let collection=db.collection('employee')
            collection.updateOne({name:"Karan"},
                {
                    $set:{age:35}
                },((e,s)=>{
                    if(e){
                        res.send(e)
                    }else{
                        res.send(s)
                        console.log(s)
                    }
                })
            )
        }
    })
})