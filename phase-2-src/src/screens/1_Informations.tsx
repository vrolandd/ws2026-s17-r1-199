import { Dispatch, ReactElement, SetStateAction, useEffect, useRef } from "react";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Select from "../components/Select";
import useFormValidator from "../useFormValidator";

export default function InformationsScreen({ nextAllowed, visible }: { nextAllowed: Dispatch<SetStateAction<() => boolean>>, visible: boolean }): ReactElement {
    const infoForm = useRef<HTMLFormElement | null>(null);

    const submittedTimes = useRef<number>(0);

    const [ formErrors, checkInput, checkFormValues ] = useFormValidator({
        inputs: {
            sudsyname: {
                isValid: (value: string) => {
                    if (submittedTimes.current == 0) return;
                    if (value.length < 3) {
                        return 'Name must be at least 3 characters long.'
                    } else if (value.length > 32) {
                        return 'Name must be at most 32 characters long.'
                    }
                }
            },
            description: {
                isValid: (value: string) => {
                    if (submittedTimes.current == 0) return;
                    if (value.length < 10) {
                        return 'Description must be at least 10 characters long.'
                    } else if (value.length > 256) {
                        return 'Description must be at most 256 characters long.'
                    }
                }
            },
            postalCode: {
                isValid: (value: string) => {
                    if (submittedTimes.current == 0) return;
                    if (value.length != 4) {
                        return 'Postal code must be exactly 4 characters long.'
                    }
                }
            },
            city: {
                isValid: (value: string) => {
                    if (submittedTimes.current == 0) return;
                    if (value.length < 3) {
                        return 'Name must be at least 3 characters long.'
                    } else if (value.length > 32) {
                        return 'Name must be at most 32 characters long.'
                    }
                }
            },
            address: {
                isValid: (value: string) => {
                    if (submittedTimes.current == 0) return;
                    if (value.length < 5) {
                        return 'Address must be at least 5 characters long.'
                    } else if (value.length > 128) {
                        return 'Address must be at most 128 characters long.'
                    }
                }
            },
            from: {
                isValid: (value: string) => {
                    if (submittedTimes.current == 0) return;
                    return value == "" ? 'Required' : ''
                }
            },
            to: {
                isValid: (value: string) => {
                    if (submittedTimes.current == 0) return;
                    return value == "" ? 'Required' : ''
                }
            }
        }
    })

    useEffect(() => {
        if (visible) {
            nextAllowed(() => () => {
                if (!infoForm.current) return false;
                submittedTimes.current = submittedTimes.current + 1;

                const errors = checkFormValues(infoForm.current);

                return Object.entries(errors).map(x => x[1]).filter(x => x != "").length == 0;
            })
        }
    }, [ visible ])

    return (
        <form ref={infoForm} action="" className="main" name="informations" style={{ display: visible ? 'flex' : 'none' }}>
            <h2>Information about the Location</h2>
                
            <Input
                idAndName='sudsyname'
                label='Name'
                errorMessage={formErrors.sudsyname}
                onInteract={checkInput}
            />

            <Textarea
                idAndName='description'
                label='Description'
                errorMessage={formErrors.description}
                onInteract={checkInput}
            />

            <div className="input-row">
                <Input
                    type='number'
                    idAndName='postalCode'
                    label='Postal code'
                    errorMessage={formErrors.postalCode}
                    onInteract={checkInput}
                />

                <Input
                    idAndName='city'
                    label='City'
                    errorMessage={formErrors.city}
                    onInteract={checkInput}
                />

                <Input
                    idAndName='address'
                    label='Address'
                    errorMessage={formErrors.address}
                    onInteract={checkInput}
                />
            </div>

            <hr />

            <h2>Operational hours</h2>

            <Select
                idAndName="openAt"
                label="Open at"
                defaultValue="everyday"
            >
                <option value={"everyday"}>Every day</option>
                <option value={"weekdays"}>Weekdays</option>
                <option value={"everyday"}>Weekends</option>
            </Select>

            <div className="input-row">
                <Input
                    idAndName="from"
                    type="time"
                    label="From"
                    onInteract={checkInput}
                    errorMessage={formErrors.from}
                />

                <Input
                    idAndName="to"
                    type="time"
                    label="To"
                    onInteract={checkInput}
                    errorMessage={formErrors.to}
                />
            </div>
        </form>
    )
}