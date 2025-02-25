import { Dispatch, DragEvent, ReactElement, SetStateAction, useRef, useState } from "react";
import washingMachine from '../assets/washing-machine.svg'
import armchair from '../assets/armchair.svg'
import space from '../assets/space.svg'
import alert_icon from '../assets/alert.svg'
import GridItem, { GridItemModifyTypes, GridItemType } from "../components/GridItem";


const Grid_Columns = 3,
      Grid_Rows = 5;


export default function FloorPlanScreen({ nextAllowed }: { nextAllowed: Dispatch<SetStateAction<() => boolean>> }): ReactElement {
    const draggedItem = useRef<HTMLDivElement | null>(null);

    const [ gridItems, setGridItems ] = useState<GridItemType[]>(
        Array(Grid_Columns * Grid_Rows).fill("empty")
    );

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        console.log(e)

        draggedItem.current = e.currentTarget;
    }

    const onDrop = (index: number) => {
        if (draggedItem.current) {
            console.log(draggedItem.current.className.split(' ')[1])
            const newGridItems = [ ...gridItems ];
            newGridItems[index] = draggedItem.current.className.split(' ')[1] as GridItemType;

            setGridItems(newGridItems);
        }
    }

    const onType = (index: number, newType: GridItemModifyTypes) => {
        const newGridItems = [ ...gridItems ];
        newGridItems[index] = newType;

        setGridItems(newGridItems);
    }


    return (
        <form className="main">
            <div className="dnd-row">
                <div draggable onDragStart={dragStartHandler} className="grid-item washer">
                    <img src={washingMachine} alt="Washing Machine" />
                    <span>Washer (11 kg)</span>
                </div>
                <div draggable onDragStart={dragStartHandler} className="grid-item dryer">
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

            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${Grid_Columns}, 1fr)`,
                    gridTemplateRows: `repeat(${Grid_Rows}, 1fr)`
                }}
            >
                {
                    gridItems.map((item, index) => (
                        <GridItem
                            key={item + index}
                            index={index}
                            onDrop={onDrop}
                            onType={onType}
                            type={item}
                        />
                    ))
                }
            </div>

            <hr />

            <div className="alert">
                <img src={alert_icon} alt="Alert" />
                <span>This is an error message.</span>
            </div>
        </form>
    )
}