import { FormEvent, memo, ReactElement, useEffect, useRef } from "react";

const Textarea = memo(_Textarea);
export default Textarea;

function _Textarea({
    label,
    idAndName,
    placeholder = "",
    errorMessage,
    onInteract = () => {}
}: {
    label?: string;
    idAndName: string;
    placeholder?: string;
    errorMessage?: string;
    onInteract?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}): ReactElement {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (!textareaRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        if (config[idAndName]) {
            textareaRef.current.value = config[idAndName];
        }
    }, [  ])

    const interactionHandler = (e: FormEvent<HTMLTextAreaElement>) => {
        onInteract(e)
        
        if (!textareaRef.current) return;
        const sst = window.sessionStorage.getItem('config') as string | null;

        if (!sst) return;

        const config = JSON.parse(sst);
        config[idAndName] = textareaRef.current.value;
        window.sessionStorage.setItem('config', JSON.stringify(config));
    }

    return (
        <div className="input-group">
            {
                label && <label htmlFor={idAndName}>{label}</label>
            }

            <textarea id={idAndName} ref={textareaRef} onInput={interactionHandler} onBlur={interactionHandler} onFocus={interactionHandler} name={idAndName} className={errorMessage ? 'error' : ''} placeholder={placeholder} rows={5}></textarea>

            {
                errorMessage && <span className="input-error">{errorMessage}</span>
            }
        </div>
    )
}