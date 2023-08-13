import { createBlock } from '../../logic/panels'
import context from '../../context'

/**
 * The `BlockCreate` function is a React component that renders a form for creating a new block with
 * width and height inputs, and handles the submission and cancellation of the form.
 * @returns The code is returning a JSX element, specifically a `<div>` element with a form inside. The
 * form has input fields for width and height, along with buttons for submitting the form and canceling
 * the operation.
 */
export function BlockCreate({ onCreatedBlock, onExitModal, panelId}) {
    const handleOnExit = () => onExitModal()
    const handleOnSubmitPanel = function (event) {
        event.preventDefault()

        const width = event.target.width.value
        const height = event.target.height.value

        try {
            createBlock(context.tokenUser, panelId, width, height)
                .then(() => onCreatedBlock())
                .catch(error => { alert('Error: ' + error.message) })
        } catch (error) { alert('Error: ' + error.message) }
    }

    return <div className="basic-modal">
        <form className="basic-form" action="submit" onSubmit={handleOnSubmitPanel}>
            <h4>Nuevo Bloque</h4>

            <label className="basic-label" htmlFor="width">Width</label>
            <input type="text" id="width"></input>

            <label className="basic-label" htmlFor="height">Height</label>
            <input type="text" id="height"></input>

            <div className="flex-center">
                <button type="submit" className="newpost-button basic-button">New</button>
                <button type="button" className="newpost-button-cancel basic-button" onClick={handleOnExit}>Cancel</button>
            </div>
        </form>
    </div>
}
