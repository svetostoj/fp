const mongoose = require('mongoose')

// const url=process.env(MONGO_URI)
const url = "mongodb://localhost:27017"
const options = {
    dbName: "fp-db",
    useNewUrlParser: true,
    useCreateIndex: true
}

mongoose.connect(url, options)
    .then(() => {
        console.info(`MongoDb connection to ${options.dbName} established`)
    })
    .catch(err => {
        console.error(`MongoDb connection to ${options.dbName} error ${err.message}`)
    })

module.exports = mongoose;