const Dimension = require('./Dimension')
const Dimension2D = require('./Dimension2D')

/**
 * The Block function in JavaScript creates a block object with specified width, height, rotation, and
 * position.
 * @param width - The width of the block.
 * @param height - The "height" parameter in the Block function represents the height of the block. It
 * is a required parameter and should be a number.
 * @param orientation - The "orientation" parameter in the Block constructor is used to indicate whether the
 * block is rotated or not. It is a number that can have two possible values initially: 0,1
 * @param pos - The "pos" parameter represents the position of the block. It is an instance of the
 * "Dimension2D" class, which likely has properties "x" and "y" representing the x and y coordinates of
 * the position.
 */
class Block {
    constructor(width, height, orientation, pos) {
        if (typeof width !== 'number') throw new Error('width isNaN in Block')
        if (typeof height !== 'number') throw new Error('height isNaN in Block')
        if (typeof orientation !== 'number') throw new Error('orientation isNaN in Block')
        if (!pos) pos = null
        if (!(pos instanceof Dimension2D) && pos !== null) throw new Error('pos !Dimension2D in block')

        const widthDim = new Dimension(width)
        const heightDim = new Dimension(height)
        if (!widthDim.isValid2() || !heightDim.isValid2()) throw new Error('block size wrong')

        this.size = new Dimension2D(width, height)
        this.orientation = orientation
        this.pos = pos
    }
    // Return if block is placed
    isPlaced() {
        return !(this.pos.x.val === -1 || this.pos.y.val === -1)
    }
}

Block.REGULAR = 0
Block.ROTATED90 = 1

module.exports = Block