const context = require('../../context')
const { Dimension2D, Block, Panel } = require('../classes')

const cep = function (panelInit) {
    // Copy Panel
    // console.count('Nesting')
    const blocksList = panelInit.blocks.map(({ pos, size, orientation }) => {
        return new Block(pos.x.toNumber(), pos.y.toNumber(), size.x.toNumber(), size.y.toNumber(), orientation)
    })
    const panel = new Panel(
        panelInit.reference,
        panelInit.owner,
        panelInit.size.x.value,
        panelInit.size.y.value,
        blocksList,
        3
    )
    // Check if panel is finished
    if (panel.blocskPlacedAll()) {
        panel.status = 4
        if (!context.heightBlocks) context.heightBlocks = panel.size.y.value + 1n

        // Save Panel if blocks height is lower
        const heightPanel = panel.heightMax()
        if (heightPanel < context.heightBlocks) {
            context.optPanel = panel
            context.heightBlocks = heightPanel
        }
        return
    } else {
        // Vertex calculation
        const vertexs = []
        if (!panel.blocks.some(block => block.isPlaced())) vertexs.push(new Dimension2D(0n, 0n))

        panel.blocks.forEach(block => {
            if (!block.isPlaced()) {
                let widthBlk, heightBlk
                if (block.orientation === 0) {
                    widthBlk = block.size.x.value
                    heightBlk = block.size.y.value
                } else {
                    widthBlk = block.size.y.value
                    heightBlk = block.size.x.value
                }
                vertexs.push(new Dimension2D(block.pos.x.value, block.pos.y.value))
                vertexs.push(new Dimension2D(block.pos.x.value + widthBlk, block.pos.y.value))
                vertexs.push(new Dimension2D(block.pos.x.value + widthBlk, block.pos.y.value + heightBlk))
                vertexs.push(new Dimension2D(block.pos.x.value, block.pos.y.value + heightBlk))
            }
        })
        // Placing blocks
        vertexs.forEach(vertex => {

            // no run over blocks array !!!

            const posIni = new Dimension2D(vertex.x.value, vertex.y.value)
            for (let quadrant = 1; quadrant < 5; quadrant++)
                if (panel.quadFree(posIni, quadrant)) {
                    for (let rotation = 0; rotation < 2; rotation++) {
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
                        let validBlock = true
                        for (let coorX = posIni.x.value + 1n; coorX < posEnd.x.value; coorX++) {
                            for (let coorY = posIni.y.value + 1n; coorY < posEnd.y.value; coorY++)
                                if (!panel.posFree(new Dimension2D(coorX, coorY))) {
                                    validBlock = false
                                    break
                                }
                            if (!validBlock) break
                        }
                        if (validBlock) {
                            block.pos.x.value = posIni.x.value
                            block.pos.y.value = posIni.y.value
                            block.orientation = rotation
                        }
                        cep(panel)
                    }

                })
    }
}

const optimizePanel = function () {
    console.log('Start...')
    cep(context.mainPanel)
    console.log('Finished...')
    console.log(context.optPanel)
}

module.exports = { optimizePanel }