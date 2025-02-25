import { memo, ReactElement } from "react";

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
    return (
        <label className="cnr-label">
            <input name={name} defaultChecked={defaultChecked} value={value} type="radio" />
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