const mongodb = require('mongodb')
const context = require('./context')
const retrieveUser = require('./retrieveUser')

const { MongoClient } = mongodb
const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(con => {
        context.users = con.db('data').collection('users')
        try {
            return retrieveUser('64a02f4a1d585f721cd61f85')
                .then((value) => console.log(value.name))
                .catch(err => console.error(err))
        } catch (err) {
            console.error(err)
        }
    })
    .catch(err => console.error(err))
    .finally(() => {
        context.users = null
        client.close()
    })
