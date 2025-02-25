import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";

export default function ExportScreen({ nextAllowed, visible }: { nextAllowed: Dispatch<SetStateAction<() => boolean>>, visible: boolean }): ReactElement {
    useEffect(() => {
        if (visible) nextAllowed(() => () => false)
    }, [ visible ])
    
    return (
        <main className="step-4-screen" style={{ display: visible ? 'flex' : 'none' }}>
            <h2>Successful submission!</h2>

            <p>Thank you for the new location registration!</p>

            <button className="btn">Copy form values</button>
            <button className="btn">Export floorplan</button>
            
            <hr />
            
            <button className="btn">Start over</button>
        </main>
    )
}