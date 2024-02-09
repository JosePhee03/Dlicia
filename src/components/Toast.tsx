interface ToastProps {
  type?: 'success' | 'error' | 'info'
  message: string
}

export default function Toast({ message }: ToastProps) {



  const toastElement = <div role="alert" class="rounded border-2 border-green-200 bg-green-50 p-4 fixed top-2 shadow-md">
    <div class="flex items-start gap-4">
      <span class="text-green-600">
        <svg
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
      </span>

      <div class="flex-1">
        <strong class="block font-medium text-gray-900"> Changes saved </strong>

        <p class="mt-1 text-sm text-gray-700">{message}</p>
      </div>
    </div>
  </div>

  return toastElement

};