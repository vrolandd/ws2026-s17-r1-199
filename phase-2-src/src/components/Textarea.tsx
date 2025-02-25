import { memo, ReactElement } from "react";

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
    return (
        <div className="input-group">
            {
                label && <label htmlFor={idAndName}>{label}</label>
            }

            <textarea id={idAndName} onInput={onInteract} onBlur={onInteract} onFocus={onInteract} name={idAndName} className={errorMessage ? 'error' : ''} placeholder={placeholder} rows={5}></textarea>

            {
                errorMessage && <span className="input-error">{errorMessage}</span>
            }
        </div>
    )
}