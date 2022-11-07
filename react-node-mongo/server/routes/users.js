var express = require('express');
var router = express.Router();
var mongo = require('mongodb')
var mongoConnect = require('./mongoConnection')
let database = 'React-Node-Mongo'

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/reg-user', function (req, res, next) {
  let n = req.query.name
  let l = req.query.loc
  res.send(`Hello this is ${n} and I am from ${l}`);
});

router.post('/reg-user-path-params', (req, res) => {
  let n = req.params.name
  let l = req.params.loc
  res.send(`Hello this is ${n} and I am from ${l}`);
})

router.post('/reg-user-headers', (req, res) => {
  let n = req.headers.name
  let l = req.headers.loc
  res.send(`Hello this is ${n} and I am from ${l}`);
})

router.post('/reg-user-body', (req, res) => {
  let n = req.body.name
  let l = req.body.loc
  res.send(`Hello this is ${n} and I am from ${l}`);

})


router.post('/reg-user', (req, res) => {
  var data = req.body.valueObj
  mongoConnect(res, database, (db) => {
    let collection = db.collection('renomo')
    collection.insertOne(data, (e, s) => {
      if (e) {
        res.send(e)
      } else {
        res.send(s)
      }
    })
  })

})


router.post('/login', (req, res) => {
  var data = req.body.userObj
  mongoConnect(res, database, (db) => {
    let collection = db.collection('renomo')
    collection.find(data).toArray((e, s) => {
      if (e) {
        res.send(e)
      } else {
        res.send(s)
      }
    })
  })
})


router.get('/get-user-by-uid', (req, res) => {
  let userId = req.query.uid
  mongoConnect(res, database, (db) => {
    let collection = db.collection('renomo')
    collection.find({ uid: userId }).toArray((e, s) => {
      if (e) {
        res.send(e)
      } else {
        res.send(s)
      }
    })
  })

})

router.put('/user-update/:name', (req, res) => {
  var userName = req.params.name
  var setData = req.body.data

  mongoConnect(res, database, (db) => {
    let collection = db.collection('renomo')
   collection.updateOne({uid:userName},{$set:setData},(e,s)=>{
    if(e){
      res.send(e)
    }else{
      res.send(s)
    }
   })
  })
})

router.delete('/del-user', (req, res) => {
  var userName=req.headers.name
  mongoConnect(res, database, (db) => {
    let collection = db.collection('renomo')
    collection.deleteOne({uid:userName}, (e, s) => {
      if (e) {
        res.send(e)
      } else {
        res.send(s)
      }
    })
  })

})

module.exports = router;
