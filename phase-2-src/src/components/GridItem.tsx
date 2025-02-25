import { MouseEvent, ReactElement, useState } from "react";

import washingMachine from '../assets/washing-machine.svg'
import armchair from '../assets/armchair.svg'
import space from '../assets/space.svg'

export type GridItemType = "empty" | "wall" | "washer" | "dryer" | "waiting" | "table" | "entrance";
export type GridItemModifyTypes = "wall" | "entrance" | "empty";

export default function GridItem({
    type = "empty",
    index,
    onDrop,
    onType
}: {
    type: GridItemType;
    index: number;
    onDrop: (index: number) => void;
    onType: (index: number, newType: GridItemModifyTypes) => void;
}): ReactElement {
    const [ droppedOver, setDroppedOver ] = useState<boolean>(false);

    const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
        const element = e.dataTransfer.getData("element");
        console.log(element, e)

        onDrop(index);
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setDroppedOver(true);
    }

    const handlerDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setDroppedOver(false);
    }

    const handleDoubleClick = () => {
        onType(index, "wall")
    }

    const handleClick = () => {
        onType(index, "empty")
    }

    const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        onType(index, "entrance")
    }

    return (
        <div
            onDrop={handleDropEvent}
            onDragOver={handleDragOver}
            onDragLeave={handlerDragLeave}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onContextMenu={handleContextMenu}

            className={`grid-item ${type}`}
            style={{
                opacity: droppedOver ? 0.5 : 1,
                cursor: droppedOver ? 'copy' : 'initial',
                userSelect: 'none'
            }}
        >
            {
                type == "washer" && (
                    <>
                    <img src={washingMachine} alt="Washing Machine" />
                    <span>Washer (11 kg)</span>
                    </>
                )
            }

            {
                type == "dryer" && (
                    <>
                    <img src={washingMachine} alt="Drying Machine" />
                    <span>Dryer (25 kg)</span>
                    </>
                )
            }

            {
                type == "waiting" && (
                    <>
                    <img src={armchair} alt="Waiting Area" />
                    <span>Waiting Area</span>
                    </>
                )
            }

            {
                type == "table" && (
                    <>
                    <img src={space} alt="Folding Tables" />
                    <span>Folding Table</span>
                    </>
                )
            }

            {
                type == "wall" && (
                    <span>Wall</span>
                )
            }
        </div>
    )
}