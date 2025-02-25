import { FormEvent, HTMLInputTypeAttribute, memo, ReactElement, useEffect, useRef } from "react";

const Input = memo(_Input);
export default Input;

function _Input({
    label,
    idAndName,
    type = "text",
    placeholder = "",
    errorMessage,
    onInteract = () => {}
}: {
    label?: string;
    idAndName: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    errorMessage?: string;
    onInteract?: (e: FormEvent<HTMLInputElement>) => void;
}): ReactElement {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        if (config[idAndName]) {
            inputRef.current.value = config[idAndName];
        }
    }, [  ])

    const interactionHandler = (e: FormEvent<HTMLInputElement>) => {
        onInteract(e)
        
        if (!inputRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        config[idAndName] = inputRef.current.value;
        window.sessionStorage.setItem('config', JSON.stringify(config));
    }

    return (
        <div className="input-group">
            {
                label && <label htmlFor={idAndName}>{label}</label>
            }

            <input type={type} ref={inputRef} onInput={interactionHandler} onBlur={interactionHandler} onFocus={interactionHandler} id={idAndName} name={idAndName} className={errorMessage ? 'error' : ''} placeholder={placeholder} />

            {
                errorMessage && <span className="input-error">{errorMessage}</span>
            }
        </div>
    )
}