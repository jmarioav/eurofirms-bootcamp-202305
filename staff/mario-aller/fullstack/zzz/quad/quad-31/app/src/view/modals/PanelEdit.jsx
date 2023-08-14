import { useState, useEffect } from 'react'
import { retrievePanelOne, updatePanel } from '../../logic/panels'
import context from '../../context'

/**
 * The `PanelEdit` component is a form that allows users to edit the properties of a panel, such as its
 * reference, width, and height.
 * @returns The `PanelEdit` component returns a JSX fragment. Inside the fragment, there is a
 * conditional rendering of a `<div>` element with the class name "basic-modal". This `<div>` is only
 * rendered if the `panel` state is not null. Inside the `<div>`, there is a `<form>` element with the
 * class name "basic-form". The form contains several input fields for editing
 */
export function PanelEdit({ onUpdatedPanel, onExitModal, panelId }) {
    const [panel, setPanel] = useState(null)

    useEffect(() => {
        try {
            retrievePanelOne(context.tokenUser, panelId)
                .then(panelRet => setPanel(panelRet))
                .catch(error => alert('Error: ' + error.message))
        } catch (error) { alert('Error: ' + error.message) }
    }, [])

    const handleOnExitModal = () => onExitModal()
    const handleUpdatePanel = (event) => {
        event.preventDefault()
        const reference = event.target.reference.value
        const width = event.target.width.value
        const height = event.target.height.value

        try {
            updatePanel(context.tokenUser, panelId, reference, width, height)
                .then(() => onUpdatedPanel())
                .catch(error => alert('Error: ' + error.message))
        } catch (error) { alert('Error: ' + error.message) }
    }

    return <>
        {panel && <div className="basic-modal">
            <form className="basic-form" action="submit" onSubmit={handleUpdatePanel}>
                <h4>Edit panel</h4>

                <label className="basic-label" htmlFor="reference">Reference</label>
                <input type="text" id="reference" defaultValue={panel ? panel.reference : ''}></input>

                <label className="basic-label" htmlFor="width">Width</label>
                <input type="text" id="width" defaultValue={panel ? panel.width : ''}></input>

                <label className="basic-label" htmlFor="height">Height</label>
                <input type="text" id="height" defaultValue={panel ? panel.height : ''}></input>

                <div className="flex-hor">
                    <button type="submit" className="basic-button">Save</button>
                    <button type="button" className="basic-button" onClick={handleOnExitModal}>Cancel</button>
                </div>
            </form>
        </div>}
    </>
}