function add(a, b) {
    if (typeof a !== 'number') throw new Error('a is not a number')
    if (typeof b !== 'number') throw new Error('b is not a number')

    return new Promise((resolve, reject) => {
        console.log('promise callback 1')

        resolve(a + b)
    })
}


add(10, 20)
    .then(result => {
        console.log('promise callback 2')

        console.log(result)
    })


console.log('... 1')
console.log('... 2')
console.log('... 3')
// VM344:6 promise callback 1
// VM344:21 ... 1
// VM344:22 ... 2
// VM344:23 ... 3
// VM344:15 promise callback 2
// VM344:17 30