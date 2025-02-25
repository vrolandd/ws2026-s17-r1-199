import { Dispatch, DragEvent, ReactElement, SetStateAction, useEffect, useRef, useState } from "react";
import washingMachine from '../assets/washing-machine.svg'
import armchair from '../assets/armchair.svg'
import space from '../assets/space.svg'
import alert_icon from '../assets/alert.svg'
import GridItem, { GridItemModifyTypes, GridItemType } from "../components/GridItem";
import { Grid_Columns, Grid_Rows } from "../config";
import { FloormapValidator } from "../tools";

export default function FloorPlanScreen({ nextAllowed, visible }: { nextAllowed: Dispatch<SetStateAction<() => boolean>>, visible: boolean }): ReactElement {
    const [ error, setError ] = useState<string>("");
    
    // This is going to store the item the user began to drag
    const draggedItem = useRef<HTMLDivElement | null>(null);

    const gridItemsRef = useRef<GridItemType[]>(
        Array(Grid_Columns * Grid_Rows).fill("empty")
    );

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        // We set the dragged element as the draggedItem, to reuse it later
        draggedItem.current = e.currentTarget;
    }

    const onDrop = (index: number): GridItemType => {
        // Type safety, for example: if the user drops an image/text, or for some reason the dragStartHandler wasn't fired, this won't run either.
        if (draggedItem.current) {
            const newType = draggedItem.current.className.split(' ')[1] as GridItemType;
            gridItemsRef.current[index] = newType;
            return newType;
        }
        
        return "empty"
    }

    const onType = (index: number, newType: GridItemModifyTypes): GridItemModifyTypes => {
        const newGridItems = [ ...gridItemsRef.current ];
        newGridItems[index] = newType;

        gridItemsRef.current = newGridItems;

        return newType;
    }

    useEffect(() => {
        if (visible) {
            nextAllowed(() => () => {
                const ans = FloormapValidator(gridItemsRef.current)
    
                setError(ans)
                return ans == "";
            })
        }
    }, [ visible ])

    return (
        <form className="main" style={{ display: visible ? 'flex' : 'none' }}>
            <h2>Shop layout</h2>

            <div className="dnd-row">
                <div draggable onDragStart={dragStartHandler} className="grid-item washer-8 washer">
                    <img src={washingMachine} alt="Washing Machine" />
                    <span>Washer (8 kg)</span>
                </div>
                <div draggable onDragStart={dragStartHandler} className="grid-item washer-11 washer">
                    <img src={washingMachine} alt="Washing Machine" />
                    <span>Washer (11 kg)</span>
                </div>
                <div draggable onDragStart={dragStartHandler} className="grid-item dryer-18 dryer">
                    <img src={washingMachine} alt="Drying Machine" />
                    <span>Dryer (18 kg)</span>
                </div>
                <div draggable onDragStart={dragStartHandler} className="grid-item dryer-25 dryer">
                    <img src={washingMachine} alt="Drying Machine" />
                    <span>Dryer (25 kg)</span>
                </div>
                <div draggable onDragStart={dragStartHandler} className="grid-item waiting">
                    <img src={armchair} alt="Waiting Area" />
                    <span>Waiting Area</span>
                </div>
                <div draggable onDragStart={dragStartHandler} className="grid-item table">
                    <img src={space} alt="Folding Tables" />
                    <span>Folding Table</span>
                </div>
            </div>

            {
                error != '' && (
                    <div className="alert">
                        <img src={alert_icon} alt="Alert" />
                        <span>{ error }</span>
                    </div>
                )
            }
            

            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${Grid_Columns}, 1fr)`,
                    gridTemplateRows: `repeat(${Grid_Rows}, 1fr)`
                }}
            >
                {
                    gridItemsRef.current.map((item, index) => (
                        <GridItem
                            key={index}
                            index={index}
                            onDrop={onDrop}
                            onType={onType}
                            defaultType={item}
                        />
                    ))
                }
            </div>
        </form>
    )
}