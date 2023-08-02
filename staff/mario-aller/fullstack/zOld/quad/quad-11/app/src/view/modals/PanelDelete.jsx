import { deletePanel } from '../../logic/panel-ctrl'
import context from '../../context'

export function PanelDelete({ onDeletedPanel, onExitModal, panelId }) {
    const handleOnExitModal = () => onExitModal()
    const handleUpdatePost = (event) => {
        event.preventDefault()

        try {
            deletePanel(context.tokenUser, panelId)
                .then(() => onDeletedPanel())
                .catch(error => alert('Error: ' + error.message))
        } catch (error) { alert('Error: ' + error.message) }
    }

    return <>
        {<div className="basic-modal">
            <form className="basic-form" action="submit" onSubmit={handleUpdatePost}>
                <h4>Delete panel</h4>

                <div className="flex-hor">
                    <button type="submit" className="basic-button">Delete</button>
                    <button type="button" className="basic-button" onClick={handleOnExitModal}>Cancel</button>
                </div>
            </form>
        </div>}
    </>
}