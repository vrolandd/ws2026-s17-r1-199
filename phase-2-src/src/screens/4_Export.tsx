import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { GetFloorplanValues, GetFormValues } from "../tools";

export default function ExportScreen({ nextAllowed, visible, startOver }: { nextAllowed: Dispatch<SetStateAction<() => boolean>>, visible: boolean, startOver: () => void }): ReactElement {
    useEffect(() => {
        if (visible) nextAllowed(() => () => false)
    }, [ visible ])

    const copyFormValues = () => {
        navigator.clipboard.writeText(JSON.stringify(GetFormValues(), null, 4));
    }

    const exportFloorplan = () => {
        const floorplan_csv = GetFloorplanValues();

        const file = new Blob([floorplan_csv], { type: 'text/csv' });
        const url = URL.createObjectURL(file);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'floorplan.csv';
        a.click();

        URL.revokeObjectURL(url);
        a.remove();
    }
    
    return (
        <main className="step-4-screen" style={{ display: visible ? 'flex' : 'none' }}>
            <h2>Successful submission!</h2>

            <p>Thank you for the new location registration!</p>

            <button className="btn" onClick={copyFormValues}>Copy form values</button>
            <button className="btn" onClick={exportFloorplan}>Export floorplan</button>
            
            <hr />
            
            <button className="btn" onClick={startOver}>Start over</button>
        </main>
    )
}