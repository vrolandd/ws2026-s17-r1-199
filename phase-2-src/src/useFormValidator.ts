import React, { useState } from "react"

type Validator = {
    isValid: (value: string) => string | undefined,
}

type Inputs<T> = {
    [K in keyof T]: Validator
}

export default function useFormValidator<T extends { [key: string]: any }>({
    inputs,
}: {
    inputs: Inputs<T>
}): [
    { [K in keyof T]: string },
    (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    (e: HTMLFormElement) => { [K in keyof T]: string }
] {
    const [errors, setErrors] = useState<{ [K in keyof T]: string }>(
        Object.keys(inputs).reduce((acc, key) => {
            acc[key as keyof T] = "";
            return acc;
        }, {} as { [K in keyof T]: string })
    );

    function CheckInput(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const inputName = e.currentTarget.name;

        if (inputName in inputs) {
            const validator = inputs[inputName];
            const result = validator.isValid((e.currentTarget.value).trim());

            setErrors({
                ...errors,
                [inputName]: result || ""
            });
            
            return result;
        }
    }

    function CheckFormValues(form: HTMLFormElement) {
        const formData = new FormData(form);

        let errs: { [K in keyof T]: string } = {} as { [K in keyof T]: string };

        for (let name in inputs) {
            const result = inputs[name].isValid((formData.get(name) as string || "").trim());
            errs[name as keyof T] = result || "";
        }

        setErrors(errs);
        return errs;
    }

    return [errors, CheckInput, CheckFormValues];
}