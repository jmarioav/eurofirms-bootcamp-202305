
// -------------------------
// Business Logic
// -------------------------


// Verificacion de usuario (ret T/F)
var userExist = function (email) {
    var num = users.length

    if (num !== 0) {
        for (var i = 0; i < num; i++) {
            if (email === users[i].email) {
                return true;
            }
        }
    }
    return false;
}

// Verificacion de clave de usuario (ret T/F)
var userPasswordOK = function (email, password) {
    var num = users.length

    if (num !== 0) {
        for (i = 0; i < num; i++) {
            if (email === users[i].email) {
                if (password === users[i].password) return true;
                break;
            }
        }
    }
    return false;
}

// Delvuelve usuario (ret objeto de la lista del usuario email)
var userRetrieve = function (email) {
    var num = users.length
    var user = {}

    if (num !== 0) {
        for (var i = 0; i < num; i++) {
            if (email === users[i].email) {
                user.name = users[i].name
                user.email = users[i].email
                return user
            }
        }
    }
    return null

}

// Añadir usuario a la lista
var userToList = function (name, email, password) {
    var user = {}

    user.name = name
    user.email = email
    user.password = password

    users.push(user)
}
