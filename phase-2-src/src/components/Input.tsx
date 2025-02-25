import { FormEvent, HTMLInputTypeAttribute, memo, ReactElement } from "react";

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
    return (
        <div className="input-group">
            {
                label && <label htmlFor={idAndName}>{label}</label>
            }

            <input type={type} onInput={onInteract} onBlur={onInteract} onFocus={onInteract} id={idAndName} name={idAndName} className={errorMessage ? 'error' : ''} placeholder={placeholder} />

            {
                errorMessage && <span className="input-error">{errorMessage}</span>
            }
        </div>
    )
}