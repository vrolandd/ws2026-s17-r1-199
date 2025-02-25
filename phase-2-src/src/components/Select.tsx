import { ReactElement, useEffect, useRef } from "react";

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
    const selectRef = useRef<HTMLSelectElement | null>(null);

    useEffect(() => {
        if (!selectRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        if (config[idAndName]) {
            selectRef.current.value = config[idAndName];
        }
    }, [  ])

    const interactionHandler = () => {
        if (!selectRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        config[idAndName] = selectRef.current.value;
        window.sessionStorage.setItem('config', JSON.stringify(config));
    }

    return (
        <div className="input-group">
            {
                label && <label htmlFor={idAndName}>{label}</label>
            }

            <select id={idAndName} ref={selectRef} onInput={interactionHandler} defaultValue={defaultValue} name={idAndName} className={errorMessage ? 'error' : ''}>
                { children }
            </select>

            {
                errorMessage && <span className="input-error">{errorMessage}</span>
            }
        </div>
    )
}