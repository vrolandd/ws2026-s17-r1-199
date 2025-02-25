import { GridItemType } from "./components/GridItem";
import { Grid_Columns } from "./config";

export function FloormapValidator(floorMap: GridItemType[]): string {
    // We have to make it sure that the Washers and Dryers are next to a wall. We'll use simple array operations for this. Our first task is to iterate through the cells.
    for (let i = 0; i < floorMap.length; i++) {
        const item = floorMap[i];

        if ((["washer", "dryer"] as GridItemType[]).includes(item)) {
            // The checkings are like this: <if the item is in the first or the last line || the item is in the first or the last column || the item is next to a wall (to the left, to the right, above, below)
            if (!(i < Grid_Columns || i >= floorMap.length - Grid_Columns   ||   (i + 1) % Grid_Columns == 0 || (i + 1) % Grid_Columns == 5   ||   floorMap[i - 1] == "wall" || floorMap[i + 1] == "wall" || floorMap[i - Grid_Columns] == "wall" || floorMap[i + Grid_Columns] == "wall")) {
                return "Washers or Dryers can only be next to a wall."
            }
        }
    }

    return "";
}