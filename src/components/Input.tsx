import { ChangeEvent } from "preact/compat"

interface InputProps {
    type: "button" | "number",
    placeholder?: string,
    value: string,
    name: string,
    id: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    className?: string
}

export function Input (props: InputProps) {
    const { type, placeholder, value = "", id = "", name = "", onChange, className } = props

    return (
        <input onChange={onChange} required className={`w-full rounded py-2 px-4 bg-slate-100 ${className}`} id={id} name={name} placeholder={placeholder} type={type} value={value} />

    )
}