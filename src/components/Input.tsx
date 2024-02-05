import { ChangeEvent } from "preact/compat"

interface InputProps {
    type: "button" | "number" | "text",
    placeholder?: string,
    value: string | number,
    name: string,
    id: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    className?: string
    label: string
    readOnly?: boolean
}

export function Input(props: InputProps) {
    const { type, placeholder, value = "", id = "", name = "", onChange, className, label, readOnly } = props

    return (
        <div>
            <label for={id} class="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>

            <input onChange={onChange} required={!readOnly} readOnly={readOnly}
                className={`w-full rounded py-2 px-4 bg-slate-100 border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white ${className}`} id={id} name={name} placeholder={placeholder} type={type} value={value} />
        </div>

    )
}