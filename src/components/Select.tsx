import { ChangeEvent } from "preact/compat"
import { JSX } from "preact";

interface SelectProps {
  name: string,
  id: string,
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void,
  className?: string
  label: string
  children: JSX.Element | JSX.Element[] | string
}

export function Select(props: SelectProps) {
  const { id = "", name = "", onChange, label, children } = props

  return (
    <div>
      <label for={id} class="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>

      <select
        onChange={onChange}
        name={name}
        id={id}
        class="mt-1.5 w-full py-2 bg-slate-100 rounded border-gray-300 text-gray-700 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      >
        {children}
      </select>
    </div>

  )
}