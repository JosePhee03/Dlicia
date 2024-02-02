import { JSX } from "preact";


interface ButtonProps {
    title?: string,
    onClick?: (event: MouseEvent) => void,
    children: JSX.Element | string,
    className?: string,
    type: "button" | "submit"
}

export function Button (props: ButtonProps) {
    const { children, title, onClick, className, type } = props


    return (
        <button title={title} onClick={onClick} type={type} className={`px-2 py-1 rounded bg-black text-white font-bold text-md ${className}`}>
            {children}
        </button>
    )

}