import { memo, ReactElement } from "react";

const RadioButton = memo(_RadioButton);
export default RadioButton;

function _RadioButton({
    label,
    name,
    value
}: {
    label?: string;
    name: string;
    errorMessage?: string;
    value?: string;
}): ReactElement {
    return (
        <label className="cnr-label">
            <input name={name} value={value} type="radio" />
            <span>{ label }</span>
        </label>
    )
}

export function RadioButtonProvider({
    children,
    errorMessage,
}: {
    children: ReactElement,
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