import { ChangeEvent, JSX } from "preact/compat"

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
    children?: JSX.Element | JSX.Element[] | string
    list?: string
}

export function Input(props: InputProps) {
    const { children, list, type, placeholder, value = "", id = "", name = "", onChange, className, label, readOnly } = props

    return (
        <div>
            <label for={id} class="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>

            <input list={list} onChange={onChange} required={!readOnly} readOnly={readOnly}
                className={`mt-2 w-full focus:outline-none focus:ring rounded py-2 px-4 bg-slate-100 border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white ${className}`} id={id} name={name} placeholder={placeholder} type={type} value={value} />

            {children}

        </div>

    )
}