const context = require('../../context')
const { Dimension2D, Block, Panel } = require('../classes')

const cep = function (panel) {
    context.nesting++
    context.times++
    console.log('Nesting:', context.nesting, '> Times:', context.times)

    const heightMax = panel.heightMax()
    const widthMax = panel.widthMax()

    if (panel.blocskPlacedAll()) {
        panel.status = 4
        if (!context.heightBlocks) context.heightBlocks = panel.size.y.value + 1n

        // Save Panel if blocks height is lower
        if (heightMax < context.heightBlocks) {
            context.optPanel = panel
            context.heightBlocks = heightMax
        }
        context.nesting -= 1
        return
    } else {
        // Regular Vertex calculation
        const vertexs = []
        vertexs.push(new Dimension2D(0n, 0n))
        panel.blocks.forEach(block => {
            if (block.isPlaced()) {
                let widthBlk, heightBlk
                if (block.orientation === 0) {
                    widthBlk = block.size.x.value
                    heightBlk = block.size.y.value
                } else {
                    widthBlk = block.size.y.value
                    heightBlk = block.size.x.value
                }
                vertexs.push(new Dimension2D(block.pos.x.value + widthBlk, block.pos.y.value))
                vertexs.push(new Dimension2D(block.pos.x.value + widthBlk, block.pos.y.value + heightBlk))
                vertexs.push(new Dimension2D(block.pos.x.value, block.pos.y.value + heightBlk))
            }
        })
        // Add vertexs outside blocks area
        vertexs.push(new Dimension2D(widthMax, heightMax))
        vertexs.push(new Dimension2D(0n, heightMax))
        vertexs.push(new Dimension2D(widthMax, 0n))

        // Add medium point for each placed block
        for (let i = 0; i < panel.blocks.length; i++) {
            const block = panel.blocks[i]
            if (block.isPlaced()) {
                const posIni = block.pos
                const posEnd = block.coorEnd()
                for (let j = 0; j < panel.blocks.length; j++) {
                    const block2 = panel.blocks[j]
                    if (j !== i && block2.isPlaced()) {
                        const posIni2 = block2.pos
                        const posEnd2 = block2.coorEnd()
                        if (posIni.x.value > posIni2.x.value && posIni.x.value < posEnd2.x.value) {
                            vertexs.push(new Dimension2D(posIni.x.value,posIni2.y.value))
                            vertexs.push(new Dimension2D(posIni.x.value,posEnd2.y.value))                 
                        }
                        if (posEnd.x.value > posIni2.x.value && posEnd.x.value < posEnd2.x.value) {
                            vertexs.push(new Dimension2D(posEnd.x.value,posIni2.y.value))
                            vertexs.push(new Dimension2D(posEnd.x.value,posEnd2.y.value))                 
                        }
                        if (posIni.y.value > posIni2.y.value && posIni.y.value < posEnd2.y.value) {
                            vertexs.push(new Dimension2D(posIni2.x.value,posIni.y.value))
                            vertexs.push(new Dimension2D(posEnd2.x.value,posIni.y.value))                 
                        }
                        if (posEnd.y.value > posIni2.y.value && posEnd.y.value < posEnd2.y.value) {
                            vertexs.push(new Dimension2D(posIni2.x.value,posEnd.y.value))
                            vertexs.push(new Dimension2D(posEnd2.x.value,posEnd.y.value))                 
                        }
                    }
                }
            }
        }
        // Clean duplicated vertexs if there is anyone
        for (let i = 0; i < vertexs.length; i++) {
            const x = vertexs[i].x.value
            const y = vertexs[i].y.value
            for (j = i + 1; j < vertexs.length; j++)
                if (x === vertexs[j].x.value && y === vertexs[j].y.value) {
                    vertexs.splice(j, 1)
                    j--
                }
        }
        // Place free blocks
        vertexs.forEach(vertex => {
            panel.blocks.forEach((block, indexBlock) => {
                if (!block.isPlaced()) {
                    const posIni = new Dimension2D(vertex.x.value, vertex.y.value)
                    for (let quadrant = 1; quadrant < 5; quadrant++)
                        if (panel.quadFree(posIni, quadrant))
                            for (let rotation = 0; rotation < 2; rotation++) {
                                // Calculate block coordinates
                                let widthBlk, heightBlk
                                if (rotation === 0) {
                                    widthBlk = block.size.x.value
                                    heightBlk = block.size.y.value
                                } else {
                                    widthBlk = block.size.y.value
                                    heightBlk = block.size.x.value
                                }
                                switch (quadrant) {
                                    case 1:
                                        break
                                    case 2:
                                        posIni.x.value -= widthBlk
                                        break
                                    case 3:
                                        posIni.x.value -= widthBlk
                                        posIni.y.value -= heightBlk
                                        break
                                    case 4:
                                        posIni.y.value -= heightBlk
                                        break
                                    default:
                                        throw new Error('wrong quadrant')
                                }
                                const posEnd = new Dimension2D(posIni.x.value + widthBlk, posIni.y.value + heightBlk)
                                // See if all surface block is free
                                let validBlock = true
                                for (let coorX = posIni.x.value + 1n; coorX < posEnd.x.value; coorX++) {
                                    for (let coorY = posIni.y.value + 1n; coorY < posEnd.y.value; coorY++)
                                        if (!panel.posFree(new Dimension2D(coorX, coorY))) {
                                            validBlock = false
                                            break
                                        }
                                    if (!validBlock) break
                                }
                                // Place block in new panel
                                if (validBlock) {
                                    const blocksList2 = panel.blocks.map(({ pos, size, orientation }) =>
                                        new Block(
                                            pos.x.value,
                                            pos.y.value,
                                            size.x.value,
                                            size.y.value,
                                            orientation
                                        )
                                    )
                                    const panel2 = new Panel(
                                        panel.reference,
                                        panel.owner,
                                        panel.size.x.value,
                                        panel.size.y.value,
                                        blocksList2,
                                        3
                                    )
                                    panel2.blocks[indexBlock].pos.x.value = posIni.x.value
                                    panel2.blocks[indexBlock].pos.y.value = posIni.y.value
                                    panel2.blocks[indexBlock].orientation = rotation
                                    cep(panel2)
                                }
                            }
                }
            })
        })
    }
}

const optimizePanel = function () {
    console.log('Start...')
    cep(context.mainPanel)
    console.log('Finished...')
    console.log(context.optPanel)
    return true
}

module.exports = { optimizePanel }