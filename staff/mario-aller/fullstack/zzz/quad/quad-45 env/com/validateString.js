/**
 * The function `checkDictio` checks if all characters in a given string are present in a given
 * dictionary and throws an error if any character is not valid.
 * @param dictionary - The `dictionary` parameter is an array of characters that represents the valid
 * characters allowed in the string.
 * @param str - The `str` parameter is a string that you want to check against a dictionary. The
 * function `checkDictio` will iterate through each character in the `str` and check if it exists in
 * the `dictionary` array. If any character in `str` is not found in the `dictionary
 * @returns a boolean value, either true or false.
 */
function checkDictio(dictionary, str) {
    let invalid = ''
    for (let i = 0; i < str.length; i++) if (!dictionary.includes(str[i])) {
        invalid = str[i]
        break
    }
    if (invalid !== '') throw new Error('char ' + invalid + ' not valid')
    return true
}
/**
 * The `validateString` function is used to validate different types of strings based on the specified
 * option.
 * @param data - The `data` parameter is the string that needs to be validated. It is the input that
 * you want to check for certain conditions or requirements.
 * @param [option=0] - The `option` parameter is used to specify the type of validation to be performed
 * on the `data` string. It is an optional parameter with a default value of 0. The possible values for
 * `option` are defined as constants in the `validateString` function. Here are the available options
 */
function validateString(data, option = 0) {
    if (typeof data !== 'string') throw new Error('param is not a string')
    if (data === '') throw new Error('the string is empty')

    const charsValid1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charsValid2 = '+/,;:._-$'
    const charsValid3 = '._-$'
    const charsValid4 = 'ñÑáéíóúäëïöüÁÉÍÓÚÄËÏÖÜçÇ'
    const charsValid5 = '@/=?()%&'
    const charsValid6 = '0123456789'

    switch (option) {
        case validateString.REGULAR:
            checkDictio(charsValid1 + charsValid2 + charsValid5, data)

            break
        case validateString.EMAIL:
            checkDictio(charsValid1 + charsValid3 + '@', data)

            const atPos = data.indexOf('@')
            const dotPos = data.lastIndexOf('.')
            if (atPos < 0) throw new Error('email with no @')
            if (atPos === 0) throw new Error('email with @ at the beginning')
            if (atPos === data.length - 1) throw new Error('email with @ at the end')
            if (dotPos < 0) throw new Error('email without .')
            if (dotPos === 0) throw new Error('email with . at the beginning')
            if (dotPos === data.length - 1) throw new Error('email with . at the end')
            if (dotPos - atPos < 2) throw new Error('@ and . wrong placed')

            const strAux1 = data.slice(0, atPos)
            const strAux2 = data.slice(atPos + 1)
            checkDictio(charsValid1 + charsValid3, strAux1)
            checkDictio(charsValid1 + charsValid3, strAux2)

            break
        case validateString.PASSWORD:
            checkDictio(charsValid1 + charsValid2 + charsValid4 + '@', data)
            if (data.length < 3) throw new Error('the password has to be 3 o more chars length')

            break
        case validateString.URL:
            checkDictio(charsValid1 + charsValid2 + charsValid5, data)
            if (data.slice(0, 4).toLowerCase() !== 'http')
                throw new Error('address do not begin with http')

            break
        case validateString.NAME:
            checkDictio(charsValid1 + charsValid2 + charsValid4 + ' ', data)

            break
        case validateString.INTEGER:
            checkDictio(charsValid6, data)
            if (data.length > 15) throw new Error('number too big')

            break
        default: throw new Error('option not defined')
    }
}

validateString.REGULAR = 0
validateString.EMAIL = 1
validateString.PASSWORD = 2
validateString.URL = 3
validateString.NAME = 4
validateString.INTEGER = 5

module.exports = validateString