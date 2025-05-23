import { getTypeName, GridItemType } from "./components/GridItem";
import { Grid_Columns, Grid_Rows } from "./config";

type ConfigurationItems = {
    address: string;
    city: string;
    description: string;
    from: string;
    parking: "Easy" | "Medium" | "Hard";
    openAt: string;
    to: string;
}

export const Basic_Configuration: BasicConfiguration = {
    accessibleEntry: "off",
    address: "",
    backgroundMusic: "off",
    city: "",
    customerService: "off",
    description: "",
    freeWiFi: "off",
    from: "",
    loungeArea: "off",
    openAt: "everyday",
    parking: "Easy",
    postalCode: "",
    sudsyname: "",
    to: ""
};

export type BasicConfiguration = ConfigurationItems & {
    accessibleEntry: "on" | "off";
    backgroundMusic: "on" | "off";
    customerService: "on" | "off";
    freeWiFi: "on" | "off";
    loungeArea: "on" | "off";
    sudsyname: string;
    postalCode: string;
};

export type FinalConfiguration = ConfigurationItems & {
    accessibleEntry: boolean;
    backgroundMusic: boolean;
    customerService: boolean;
    freeWiFi: boolean;
    loungeArea: boolean;
    postalCode: number;
    name: string;
};


export function FloormapValidator(floorMap: GridItemType[]): string {
    // We have to make it sure that the Washers and Dryers are next to a wall. We'll use simple array operations for this. Our first task is to iterate through the cells.
    for (let i = 0; i < floorMap.length; i++) {
        const item = floorMap[i];

        if ((["washer-8", "washer-11", "dryer-18", "dryer-25"] as GridItemType[]).includes(item)) {
            // The checkings are like this: <if the item is in the first or the last line || the item is in the first or the last column || the item is next to a wall (to the left, to the right, above, below)
            if (!(i < Grid_Columns || i >= floorMap.length - Grid_Columns   ||   i % Grid_Columns == 0 || i % Grid_Columns == 5   ||   floorMap[i - 1] == "wall" || floorMap[i + 1] == "wall" || floorMap[i - Grid_Columns] == "wall" || floorMap[i + Grid_Columns] == "wall")) {
                return "Washers or Dryers can only be next to a wall."
            }
        }
    }

    return "";
}

export function GetFormValues(): FinalConfiguration {
    let formValues = { ...Basic_Configuration } as BasicConfiguration;

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        if (form.name == "floorplan") return
        const FD = new FormData(form);

        for (let [key, val] of FD.entries()) {
            formValues = {
                ...formValues,
                [key]: val
            } as BasicConfiguration;
        }
    })

    const final = {
        name: formValues.sudsyname,
        description: formValues.description,
        postalCode: parseInt(formValues.postalCode),
        city: formValues.city,
        address: formValues.address,
        from: formValues.from,
        to: formValues.to,
        openAt: formValues.openAt,
        freeWiFi: formValues.freeWiFi == "on" ? true : false,
        accessibleEntry: formValues.accessibleEntry == "on" ? true : false,
        loungeArea: formValues.loungeArea == "on" ? true : false,
        backgroundMusic: formValues.backgroundMusic == "on" ? true : false,
        customerService: formValues.customerService == "on" ? true : false,
        parking: formValues.parking,
    } as FinalConfiguration;

    console.log(final);
    return final;
}

export function GetFloorplanValues(): string {
    const floorplan = document.querySelector('form[name=floorplan]') as HTMLFormElement;
    const FD = new FormData(floorplan);

    let floorplanValues: GridItemType[] = [];

    for (let [_, val] of FD.entries()) {
        floorplanValues.push(val as GridItemType);
    }

    let csv_string = "";

    for (let i = 0; i < Grid_Rows; i++) {
        console.log(i * Grid_Rows * Grid_Columns, (i * Grid_Rows * Grid_Columns) + Grid_Columns)
        const row = floorplanValues.slice(i * Grid_Columns, (i * Grid_Columns) + Grid_Columns);
        console.log(row);

        csv_string += row.map(x => x == "empty" ? '-' : getTypeName(x)).join(",") + "\n";
    }

    csv_string = csv_string.trim();

    return csv_string;
}