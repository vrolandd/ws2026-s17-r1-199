import { memo, ReactElement, useEffect, useRef } from "react";

const RadioButton = memo(_RadioButton);
export default RadioButton;

function _RadioButton({
    label,
    name,
    value,
    defaultChecked
}: {
    label?: string;
    name: string;
    errorMessage?: string;
    value?: string;
    defaultChecked?: boolean;
}): ReactElement {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        console.log(config)
        
        if (config[name]) {
            inputRef.current.checked = config[name] == value;
        }
    }, [  ])

    const interactionHandler = () => {
        if (!inputRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        config[name] = inputRef.current.value;
        window.sessionStorage.setItem('config', JSON.stringify(config));
    }

    return (
        <label className="cnr-label">
            <input name={name} ref={inputRef} onChange={interactionHandler} defaultChecked={defaultChecked} value={value} type="radio" />
            <span>{ label }</span>
        </label>
    )
}

export function RadioButtonProvider({
    children,
    errorMessage,
}: {
    children: ReactElement[],
    errorMessage?: string
}): ReactElement {
    return (
    <div className="input-row">
        { children }

        {
            errorMessage && <span className="input-error">{errorMessage}</span>
        }
    </div>
    )
}