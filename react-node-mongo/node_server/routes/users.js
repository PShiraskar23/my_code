const { application } = require('express');
var express = require('express');
var app = express()
var router = express.Router();
var mongo = require('mongodb')


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

app.use(express.json())

router.get('/get', (req, res) => {
  res.send("Welcone to node server")
})

// const connectMongo=()=>{
//   let mongoClient = mongo.MongoClient;
//   let url = 'mongodb://localhost:27017'
//   mongoClient.connect(url, (err, server) => {

//     if (err) {
//       console.log(err)
//     } else {
//       let db = server.db('company')
//       console.log("mongo")
//       console.log(db.collection('employee'))
//     }

//   })
// }

// router.get('/get',(req,res)=>{
//   let cols=connectMongo()
//   cols.find().toArray()
//   res.send("db connected")
//   // console.log(cols)
// })

router.get('/get_data', (req, res) => {
  let mongoClient = mongo.MongoClient;
  let url = 'mongodb://localhost:27017'
  mongoClient.connect(url, async (err, server) => {

    if (err) {
      console.log(err)
    } else {
      let db = server.db('company')
      let collection = db.collection('employee')
      let cols = await collection.find().toArray()
      // res.send("connection established")
      console.log(cols)
      res.send(cols)
    }

  })

})

router.post("/post", (req, res) => {
  let data = {
    name: "Gita",
    age: 25,
    loc: "Mumbai"
  }

  let mongoClient = mongo.MongoClient;
  let url = 'mongodb://localhost:27017'
  mongoClient.connect(url, (err, server) => {

    if (err) {
      console.log("connection errorc")
    } else {
      console.log("db connected")
      let db = server.db('company')
      let collection = db.collection('employee')

      collection.insertOne(data, (e, s) => {
        if (e) {
          res.send(e)
        } else {
          res.send(s)
        }

      })

    }
  })


})

router.put('/put', (req, res) => {
  let mongoClient = mongo.MongoClient;
  let url = 'mongodb://localhost:27017'

  mongoClient.connect(url, async(err, server) => {
    if (err) {
      console.log("connection errorc")
    } else {
      console.log("db connected")
      let db = server.db('company')
      let collection = db.collection('employee')

      let opt= await collection.updateOne({ "name": "Karan" },
        {
          $set: { "loc": "Banglore" }
        })
        res.send(opt)
        console.log(opt)
    }
  })
})

router.delete('/delete', (req, res) => {
  let mongoClient = mongo.MongoClient;
  let url = 'mongodb://localhost:27017'

  mongoClient.connect(url, async(err, server) => {
    if (err) {
      console.log("connection errorc")
    } else {
      console.log("db connected")
      let db = server.db('company')
      let collection = db.collection('employee')

      let opt= await collection.deleteOne({ "name": "Gita"})
      res.send(opt)
      console.log(opt)
    }
  })

})


module.exports = router;
