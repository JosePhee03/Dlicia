import { createPortal } from "preact/compat"

interface ToastProps {
  type: 'success' | 'error' | 'loading'
  message: string
}

export default function Toast({ message, type }: ToastProps) {


  const svgSuccess = <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-6 w-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>

  const svgError = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
    <path
      fill-rule="evenodd"
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
      clip-rule="evenodd"
    />
  </svg>

  const svgLoading = <div
    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
    >
  </div>

  let svg;
  let textColor;
  let toastColor;
  let title;

  switch (type) {
    case "error":
      svg = svgError
      textColor = "text-red-600 dark:text-red-200"
      toastColor = "border-red-200 bg-red-50 dark:border-red-600 dark:bg-red-900"
      title = "Ocurrio un error"
      break
    case "success":
      svg = svgSuccess
      textColor = "text-green-600 dark:text-green-200"
      toastColor = "border-green-200 bg-green-50 dark:border-green-600 dark:bg-green-900"
      title = "Exito"
      break
    case "loading":
      svg = svgLoading
      textColor = "text-sky-600 dark:text-sky-200"
      toastColor = "border-sky-200 bg-sky-50 dark:border-sky-600 dark:bg-sky-900"
      title = "Cargando"
      break
  }




  return createPortal(<div class="relative z-10 "><div role="alert" class={" rounded border-2 p-4 fixed bottom-2 right-2 shadow-md " + toastColor}>
    <div class="flex items-start gap-4">
      <span class={textColor}>
        {svg}
      </span>

      <div class="flex-1 ">
        <strong class="block font-medium text-gray-900 dark:text-gray-100">{title}</strong>

        <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">{message}</p>
      </div>
    </div>
  </div></div>, document.getElementById("portal")!)

};