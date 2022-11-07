let mongo = require('mongodb')

function mongoConnect (res, database, cb) {
    let url = 'mongodb://localhost:27017'
    let mongoClient = mongo.MongoClient
    mongoClient.connect(url, (err, server) => {
        if (err) {
            res.send(err)
        } else {
            let db = server.db(database);
            cb(db)
        }
    })
}

module.exports = mongoConnect