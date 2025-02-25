import { memo, ReactElement, useEffect, useRef } from "react";

const Checkbox = memo(_Checkbox)
export default Checkbox;

function _Checkbox({
    label,
    idAndName,
    errorMessage,
}: {
    label?: string;
    idAndName: string;
    errorMessage?: string;
}): ReactElement {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        if (config[idAndName]) {
            inputRef.current.checked = config[idAndName] == "on";
        }
    }, [  ])

    const interactionHandler = () => {
        if (!inputRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        config[idAndName] = inputRef.current.checked ? 'on' : 'off';
        window.sessionStorage.setItem('config', JSON.stringify(config));
    }
    
    return (
        <label className="cnr-label">
            <input id={idAndName} onInput={interactionHandler} ref={inputRef} name={idAndName} className={errorMessage ? 'error' : ''} type="checkbox" />
            <span>{ label }</span>

            {
                errorMessage && <span className="input-error">{errorMessage}</span>
            }
        </label>
    )
}