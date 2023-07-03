const context = require('./context')
const valid = require('./valid')

function registerUser(userN, mail, pwd) {
    if (!valid(userN) ||
        !valid(mail) ||
        !valid(pwd)) throw new Error('Datos inválidos')

    return context.users.findOne({ "email": mail })
        .then((result) => {
            if (result !== null) throw Error('El usuario ya existe')
            return context.users.insertOne({ "name": userN, "email": mail, "password": pwd })
        })
}
module.exports = registerUser