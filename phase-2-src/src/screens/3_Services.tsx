import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import Checkbox from "../components/Checkbox";
import RadioButton, { RadioButtonProvider } from "../components/Radiobutton";

export default function ServicesScreen({ nextAllowed, visible }: { nextAllowed: Dispatch<SetStateAction<() => boolean>>, visible: boolean }): ReactElement {
    useEffect(() => {
        if (visible) nextAllowed(() => () => true)
    }, [ visible ])
    
    return (
        <form action="" name="services" className="main" style={{ display: visible ? 'flex' : 'none' }}>
            <h2>Amenities and Services</h2>

            <Checkbox
                idAndName="freeWiFi"
                label="Free Wi-Fi"
            />

            <Checkbox
                idAndName="accessibleEntry"
                label="Accessible Entry"
            />

            <Checkbox
                idAndName="loungeArea"
                label="Lounge Area"
            />

            <Checkbox
                idAndName="backgroundMusic"
                label="Background music"
            />

            <Checkbox
                idAndName="customerService"
                label="Personal customer service"
            />

            <hr />

            <h3>Parking</h3>

            <RadioButtonProvider>
                <RadioButton name="parking" value="Easy" label="Easy" defaultChecked />
                <RadioButton name="parking" value="Medium" label="Medium" />
                <RadioButton name="parking" value="Hard" label="Hard" />
            </RadioButtonProvider>
        </form>
    )
}