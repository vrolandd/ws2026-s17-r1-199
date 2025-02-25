import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { GetFormValues } from "../tools";

export default function ExportScreen({ nextAllowed, visible }: { nextAllowed: Dispatch<SetStateAction<() => boolean>>, visible: boolean }): ReactElement {
    useEffect(() => {
        if (visible) nextAllowed(() => () => false)
    }, [ visible ])

    const copyFormValues = () => {
        navigator.clipboard.writeText(JSON.stringify(GetFormValues(), null, 4));
    }
    
    return (
        <main className="step-4-screen" style={{ display: visible ? 'flex' : 'none' }}>
            <h2>Successful submission!</h2>

            <p>Thank you for the new location registration!</p>

            <button className="btn" onClick={copyFormValues}>Copy form values</button>
            <button className="btn">Export floorplan</button>
            
            <hr />
            
            <button className="btn">Start over</button>
        </main>
    )
}