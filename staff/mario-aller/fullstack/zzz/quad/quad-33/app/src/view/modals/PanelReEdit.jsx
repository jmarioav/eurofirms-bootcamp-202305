import { updatePanelStatusReEdit } from '../../logic/panels'
import context from '../../context'

/**
 * The `PanelReEdit` function is a React component that renders a modal for confirming whether the user
 * wants to duplicate a panel or not.
 */
export function PanelReEdit({ onReEditedPanel, onExitModal, panelId }) {
    const handleOnExitModal = () => onExitModal()
    const handleUpdatePost = (event) => {
        event.preventDefault()

        try {
            updatePanelStatusReEdit(context.tokenUser, panelId)
                .then(() => onReEditedPanel())
                .catch(error => alert('Error: ' + error.message))
        } catch (error) { alert('Error: ' + error.message) }
    }

    return <>
        {<div className="basic-modal">
            <form className="basic-form" action="submit" onSubmit={handleUpdatePost}>
                <h4>Duplicate panel</h4>

                <div className="flex-hor">
                    <button type="submit" className="basic-button">Yes</button>
                    <button type="button" className="basic-button" onClick={handleOnExitModal}>No</button>
                </div>
            </form>
        </div>}
    </>
}