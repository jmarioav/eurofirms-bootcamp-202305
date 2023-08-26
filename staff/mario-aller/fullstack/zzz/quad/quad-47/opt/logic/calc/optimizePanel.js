require('dotenv').config()
const { SAVE_EVERY_TIMES } = process.env
const { Dimension2D, Block, Panel } = require('../classes')
const fs = require('fs')
// const savePanel = require('./savePanel')

/**
 * The function displays the start or end of a process with its process ID, nesting level, and
 * iteration count.
 * @param State - The `State` parameter represents the current state of the process. It can have two
 * possible values: 0 or 1.
 * @param processId - The processId parameter represents the ID of a process.
 * @param nest - The `nest` parameter represents the level of nesting for a particular process. It
 * indicates how deeply the process is nested within other processes.
 * @param iteration - The `iteration` parameter represents the number of times the process has been
 * executed.
 */
const displayProcess = function (State, processId, nest, iteration) {
    if (processId % 100 === 0)
        if (State === 0)
            console.log('Start:', processId.toString().padStart(5),
                '| Nesting:', nest, '> Times:', iteration)
        else
            console.log('--End:', processId.toString().padStart(5),
                '| Nesting:', nest, '> Times:', iteration)
}
/**
 * The `cep` function is a recursive algorithm that calculates the best placement of blocks on a panel
 * based on certain conditions and saves the panel coordinates every 100 iterations.
 * @param panel - The `panel` parameter is an object that represents a panel. It has the following
 * properties:
 * @param context - The `context` parameter is an object that keeps track of the current state of the
 * algorithm. It contains the following properties:
 * @returns The function `cep` does not have a return statement. Therefore, it does not explicitly
 * return any value.
 */
const cep = function (panel, context) {
    context.times++
    const processId = context.times

    // Save panel coordinates each time after enviroment variable iterations
    if (processId % parseInt(SAVE_EVERY_TIMES) === 0) {
        const panelWork = {}
        panelWork.id = panel.id
        panelWork.user = panel.owner
        panelWork.blocks = panel.blocks.map(block => {
            return {
                x: block.pos.x.toNumber(),
                y: block.pos.y.toNumber(),
                width: block.size.x.toNumber(),
                height: block.size.y.toNumber(),
                orientation: block.orientation
            }
        })
        const data = JSON.stringify(panelWork)
        try {
            fs.writeFileSync(`wrkpanel.txt`, data)
        }
        catch (error) { console.error(error) }
    }

    displayProcess(0, processId, context.nesting, context.times)

    // Calculate if panel is ready to be optium
    const heightMax = panel.heightMax()
    const widthMax = panel.widthMax()

    if (panel.blocskPlacedAll()) {
        panel.status = 4

        // Calculate free panel surface
        let surfaceTotal = 0n
        let surfacePartial = 0n
        let surfacePartialMax = 0n

        for (let x = 0n; x < panel.size.x.value; x++) {
            for (let y = heightMax - 1n; y >= 0n; y--) {
                pos = new Dimension2D(x, y)
                if (panel.posFree(pos)) surfacePartial++
                else break
            }
            surfaceTotal += surfacePartial
            if (surfacePartial > surfacePartialMax) surfacePartialMax = surfacePartial
            surfacePartial = 0n
        }
        // Choose the best panel
        if (heightMax < context.heightBlocks ||
            (heightMax === context.heightBlocks &&
                surfaceTotal > context.surfaceFreeBlocks) ||
            (heightMax === context.heightBlocks &&
                surfaceTotal === context.surfaceFreeBlocks &&
                surfacePartialMax > context.surfacePartialMax)) {
            context.optPanel = panel
            context.heightBlocks = heightMax
            context.surfaceFreeBlocks = surfaceTotal
            context.surfacePartialMax = surfacePartialMax
        }
        context.nesting -= 1
        displayProcess(1, processId, context.nesting, context.times)
        return
    } else {
        // Regular Vertex calculation
        const vertexs = []
        vertexs.push(new Dimension2D(0n, 0n))
        panel.blocks.forEach(block => {
            if (block.isPlaced()) {
                const pos2 = block.coorEnd()
                vertexs.push(new Dimension2D(block.pos.x.value, block.pos.y.value))
                vertexs.push(new Dimension2D(pos2.x.value, block.pos.y.value))
                vertexs.push(new Dimension2D(pos2.x.value, pos2.y.value))
                vertexs.push(new Dimension2D(block.pos.x.value, pos2.y.value))
            }
        })
        // Add vertexs outside blocks area
        vertexs.push(new Dimension2D(widthMax, heightMax))
        vertexs.push(new Dimension2D(0n, heightMax))
        vertexs.push(new Dimension2D(widthMax, 0n))

        // Add medium points
        for (let i = 0; i < panel.blocks.length; i++) {
            const block = panel.blocks[i]
            if (block.isPlaced()) {
                const posIni = block.pos
                const posEnd = block.coorEnd()

                // Add medium points for the panel edge
                vertexs.push(new Dimension2D(posIni.x.value, 0n))
                vertexs.push(new Dimension2D(posIni.x.value, heightMax))
                vertexs.push(new Dimension2D(posEnd.x.value, 0n))
                vertexs.push(new Dimension2D(posEnd.x.value, heightMax))

                vertexs.push(new Dimension2D(0n, posIni.y.value))
                vertexs.push(new Dimension2D(widthMax, posIni.y.value))
                vertexs.push(new Dimension2D(0n, posEnd.y.value))
                vertexs.push(new Dimension2D(widthMax, posEnd.y.value))

                // Add medium point for every placed block
                for (let j = 0; j < panel.blocks.length; j++) {
                    const block2 = panel.blocks[j]
                    if (j !== i && block2.isPlaced()) {
                        const posIni2 = block2.pos
                        const posEnd2 = block2.coorEnd()

                        const block2WidthSide1Cutted =
                            posIni.x.value > posIni2.x.value &&
                            posIni.x.value < posEnd2.x.value
                        const block2WidthSide2Cutted =
                            posEnd.x.value > posIni2.x.value &&
                            posEnd.x.value < posEnd2.x.value
                        const block2HeightSide1Cutted =
                            posIni.y.value > posIni2.y.value &&
                            posIni.y.value < posEnd2.y.value
                        const block2HeighSide2Cutted =
                            posEnd.y.value > posIni2.y.value &&
                            posEnd.y.value < posEnd2.y.value

                        if (block2WidthSide1Cutted) {
                            vertexs.push(new Dimension2D(posIni.x.value, posIni2.y.value))
                            vertexs.push(new Dimension2D(posIni.x.value, posEnd2.y.value))
                        }
                        if (block2WidthSide2Cutted) {
                            vertexs.push(new Dimension2D(posEnd.x.value, posIni2.y.value))
                            vertexs.push(new Dimension2D(posEnd.x.value, posEnd2.y.value))
                        }
                        if (block2HeightSide1Cutted) {
                            vertexs.push(new Dimension2D(posIni2.x.value, posIni.y.value))
                            vertexs.push(new Dimension2D(posEnd2.x.value, posIni.y.value))
                        }
                        if (block2HeighSide2Cutted) {
                            vertexs.push(new Dimension2D(posIni2.x.value, posEnd.y.value))
                            vertexs.push(new Dimension2D(posEnd2.x.value, posEnd.y.value))
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
        // Remove no valid vertexs
        for (let i = 0; i < vertexs.length; i++) {
            let validVertex = false
            for (let quadrant = 1; quadrant <= 4; quadrant++)
                if (panel.quadFree(vertexs[i], quadrant)) {
                    validVertex = true
                    break
                }
            if (!validVertex) {
                vertexs.splice(i, 1)
                i--
            }
        }
        // Place free blocks
        vertexs.forEach(vertex => {
            panel.blocks.forEach(async (block, indexBlock) => {
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
                                        panel.id,
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
                                    panel2.status = 3

                                    context.nesting++
                                    cep(panel2, context)
                                }
                            }
                }
            })
        })
    }
    context.nesting -= 1
    displayProcess(1, processId, context.nesting, context.times)
}

/**
 * The function `optimizePanel` takes a panel as input, performs some optimization operations on it,
 * and returns the optimized panel.
 * @param panel - The `panel` parameter is the input panel that needs to be optimized. It is passed to
 * the `optimizePanel` function.
 * @returns The function `optimizePanel` returns the `optPanel` property of the `context` object.
 */
const optimizePanel = function (panel) {
    const context = {
        optPanel: null,
        heightBlocks: panel.size.y.value,
        surfaceFreeBlocks: 0n,
        surfacePartialFreeBlocks: 0n,
        nesting: 0,
        times: 0
    }

    console.log('Start...')
    const dateStart = new Date()

    try {
        cep(panel, context)

        const data = fs.readFileSync('wrkpanel-null.txt', 'utf8')
        fs.writeFileSync('wrkpanel.txt', data)
    }
    catch (error) { console.error(error) }

    console.log('Finished... Iterations:', context.times)
    const dateFinish = new Date()
    duration = parseInt((dateFinish - dateStart) / 1000 + 0.5)
    console.log('Duration:', duration, 'seconds')

    return context.optPanel
}

module.exports = optimizePanel