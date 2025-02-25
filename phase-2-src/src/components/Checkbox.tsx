import { memo, ReactElement } from "react";

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
    return (
        <label className="cnr-label">
            <input id={idAndName} name={idAndName} className={errorMessage ? 'error' : ''} type="checkbox" />
            <span>{ label }</span>

            {
                errorMessage && <span className="input-error">{errorMessage}</span>
            }
        </label>
    )
}