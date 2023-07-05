const context = require('./context')
const mongodb = require('mongodb')
const registerUser = require('./registerUser')

const { MongoClient } = mongodb
const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(connection => {
        context.users = connection.db('data').collection('users')
        try {
            return registerUser('McCartney', 'beatles2@yah.com', '12341234')
        } catch (err) {
            console.error(err)
        }
    })
    .catch(err => console.error(err))
    .finally(() => {
        context.users = null
        client.close()
    })
    