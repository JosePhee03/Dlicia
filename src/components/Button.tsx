interface ButtonProps {
    title?: string,
    onClick?: (event: MouseEvent) => void,
    children: any
    className?: string,
    type: "button" | "submit"
    disabled?: boolean
}

export function Button(props: ButtonProps) {
    const { children, title, onClick, className, type, disabled = false } = props

    return (

        <button disabled={disabled} title={title} onClick={onClick} type={type} className={`px-2 py-1 rounded bg-blue-600 text-white font-bold text-md disabled:bg-slate-50 disabled:text-slate-500  focus:outline-none focus:ring ${className}`}>
            {children}
        </button>
    )

}