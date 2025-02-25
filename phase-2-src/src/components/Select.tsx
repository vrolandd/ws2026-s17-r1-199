import { ReactElement } from "react";

export default function Select({
    label,
    idAndName,
    errorMessage,
    children,
    defaultValue
}: {
    label?: string;
    idAndName: string;
    errorMessage?: string;
    children: ReactElement[];
    defaultValue?: string;
}): ReactElement {
    return (
        <div className="input-group">
            {
                label && <label htmlFor={idAndName}>{label}</label>
            }

            <select id={idAndName} defaultValue={defaultValue} name={idAndName} className={errorMessage ? 'error' : ''}>
                { children }
            </select>

            {
                errorMessage && <span className="input-error">{errorMessage}</span>
            }
        </div>
    )
}