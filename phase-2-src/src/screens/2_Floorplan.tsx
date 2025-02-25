import { Dispatch, ReactElement, SetStateAction } from "react";
import washingMachine from '../assets/washing-machine.svg'
import armchair from '../assets/armchair.svg'
import space from '../assets/space.svg'
import alert_icon from '../assets/alert.svg'

export default function FloorPlanScreen({ nextAllowed }: { nextAllowed: Dispatch<SetStateAction<() => boolean>> }): ReactElement {
    return (
        <form className="main">
            <div className="dnd-row">
                <div className="grid-item washer">
                    <img src={washingMachine} alt="Washing Machine" />
                    <span>Washer (11 kg)</span>
                </div>
                <div className="grid-item dryer">
                    <img src={washingMachine} alt="Drying Machine" />
                    <span>Dryer (25 kg)</span>
                </div>
                <div className="grid-item">
                    <img src={armchair} alt="Waiting Area" />
                    <span>Waiting Area</span>
                </div>
                <div className="grid-item">
                    <img src={space} alt="Folding Tables" />
                    <span>Folding Table</span>
                </div>
            </div>

            <div className="grid">
                <div className="grid-item empty"></div>
                <div className="grid-item wall">
                    <span>Wall</span>
                </div>
                <div className="grid-item washer">
                    <img src={washingMachine} alt="Washing Machine" />
                    <span>Washer (11 kg)</span>
                </div>
                <div className="grid-item dryer">
                    <img src={washingMachine} alt="Drying Machine" />
                    <span>Dryer (25 kg)</span>
                </div>
                <div className="grid-item dryer">
                    <img src={washingMachine} alt="Drying Machine" />
                    <span>Dryer (25 kg)</span>
                </div>
                <div className="grid-item entrance"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
                <div className="grid-item empty"></div>
            </div>

            <hr />

            <div className="alert">
                <img src={alert_icon} alt="Alert" />
                <span>This is an error message.</span>
            </div>
        </form>
    )
}