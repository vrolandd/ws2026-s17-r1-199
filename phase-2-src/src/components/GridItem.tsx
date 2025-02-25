import { MouseEvent, ReactElement, useEffect, useRef, useState } from "react";

import washingMachine from '../assets/washing-machine.svg'
import armchair from '../assets/armchair.svg'
import space from '../assets/space.svg'

export type GridItemModifyTypes = "wall" | "entrance" | "empty";
export type GridItemType = GridItemModifyTypes | "washer-8" | "washer-11" | "dryer-18" | "dryer-25" | "dryer" | "waiting" | "table";

export const getTypeName = (itemType: GridItemType) => {
    switch (itemType) {
        case "dryer-18":
            return "Dryer (18 kg)"
        case "dryer-25":
            return "Dryer (25 kg)"
        case "washer-8":
            return "Washer (8 kg)"
        case "washer-11":
            return "Washer (11 kg)"
        case "empty":
            return "Empty"
        case "entrance":
            return "Entrance"
        case "wall":
            return "Wall"
        case "waiting":
            return "Waiting Area"
        case "table":
            return "Folding Table"
    }
}

export default function GridItem({
    defaultType = "empty",
    index,
    onDrop,
    onType
}: {
    defaultType: GridItemType;
    index: number;
    onDrop: (index: number) => GridItemType;
    onType: (index: number, newType: GridItemModifyTypes) => GridItemModifyTypes;
}): ReactElement {
    // Using this droppedOver state for the opacity effect
    const [ droppedOver, setDroppedOver ] = useState<boolean>(false);

    // WE ARE USING STATE INSIDE THE GRIDITEM COMPONENT AND NOT IN THE GRID'S COMPONENT, BECAUSE WE'D LIKE TO AVOID UNNECCESSARY RE-RENDERS.
    const [ type, setType ] = useState<GridItemType>(defaultType);

    // The setType function is being used for changing the tpye of the grid item, because it helps us to avoid unneccessary re-renders. See more details about this in optimisations.md.
    const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        updateType(onDrop(index));

        setDroppedOver(false);
    }

    const inputRef = useRef<HTMLInputElement | null>(null);

    const updateType = (type: GridItemType) => {
        setType(type)
        console.log(type)
        if (!inputRef.current) return;
        const name = inputRef.current.name;

        let config = JSON.parse(window.sessionStorage.getItem('config') as string);
        config[name] = type;

        window.sessionStorage.setItem('config', JSON.stringify(config))
    }

    const handleDoubleClick = () => {
        updateType(onType(index, "wall"))
    }

    const handleClick = () => {
        updateType(onType(index, "empty"))
    }

    const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        updateType(onType(index, "entrance"))
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setDroppedOver(true);
    }

    const handlerDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setDroppedOver(false);
    }


    useEffect(() => {
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) {
            return setType(defaultType);
        }

        const config = JSON.parse(sst);
        config[`grid[${index}]`] && setType(config[`grid[${index}]`])
    }, [ index ])


    return (
        <div
            onDrop={handleDropEvent}
            onDragOver={handleDragOver}
            onDragLeave={handlerDragLeave}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onContextMenu={handleContextMenu}

            className={`grid-item ${type} ${type.split('-')[0]}`}
            style={{
                opacity: droppedOver ? 0.5 : 1,
                cursor: droppedOver ? 'copy' : 'initial',
                userSelect: 'none'
            }}
        >
            <>
            {
                type.startsWith("washer") && (
                    <img src={washingMachine} alt="Washing Machine" />
                )
            }

            {
                type.startsWith("dryer") && (
                    <img src={washingMachine} alt="Drying Machine" />
                )
            }

            {
                type == "waiting" && (
                    <img src={armchair} alt="Waiting Area" />
                )
            }

            {
                type == "table" && (
                    <img src={space} alt="Folding Tables" />
                )
            }

            <span>{ getTypeName(type) }</span>

            <input type="hidden" ref={inputRef} name={`grid[${index}]`} value={type} />
            </>
        </div>
    )
}