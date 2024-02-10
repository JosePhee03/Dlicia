import { useEffect, useState } from "preact/hooks";
import { route } from 'preact-router'
import { ChangeEvent } from "preact/compat";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";
import { getProductos } from "../db/client";
import { DIRECTION, PRODUCTO_COLUMN, Producto } from "../db/types-db";
import { CodebarScanner } from "../components/CodebarScanner";

export function Home() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [producto, setProducto] = useState<Producto[]>([])
  const [page, setPage] = useState<number>(0)
  const [direction, setDirection] = useState<string>(DIRECTION.DESC)
  const [limit, setLimit] = useState<number>(20)
  const [sort, setSort] = useState<string>(PRODUCTO_COLUMN.FECHA)

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    route(`/${value}`)
  }

  useEffect(() => {
    getProductos({ direction, limit, page, sort })
      .then(response => {
        setProducto(response.content)
        setPage(response.page)
        setLimit(response.limit)
        setSort(response.sort)
        setDirection(response.direction)
        console.log(response)
      })
      .catch(response => console.log(response))
  }, [])

  const getCodeScanner = (code: string) => {
    setValue(code)
    route(`/${value}`)
  }

  return (
    <main className="w-full py-8 h-screen flex flex-col gap-4">
      <h1 className="font-bold text-4xl">D'licia</h1>
      <Button className="max-w-64" type="button" onClick={handleOpen} title="Buscar producto">Buscar Producto</Button>
           
      <Modal isOpen={open} onClose={handleClose} onSubmit={handleSubmit} titleModal="Buscar Producto">
        <Input label="Código de barras" onChange={handleChange} type="number" name="barcode" id="input-barcode" value={value} placeholder="77891235438734"></Input>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-20">Escanear Código de barras</label>
        <div class="flex justify-center items-center">
          <CodebarScanner onScanner={(code) => getCodeScanner(code)} />
        </div>
      </Modal>
      
      <div class="rounded-lg border border-gray-200">
  <div class="overflow-x-auto rounded-t-lg">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
        <tr>
        <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  codebar
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  producto
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  marca
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  cantidad
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  precio
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  categoria
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  fecha
                </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
      {producto.map(({ cantidad, categoria, codebar, fecha, marca, precio, producto }, index) => {
                const divider = "[&>*]:whitespace-nowrap [&>*]:px-4 [&>*]:py-2"
                function formatearFecha(fecha: Date) {
                  const dia = fecha.getDate();
                  const mes = fecha.getMonth() + 1;
                  const anio = fecha.getFullYear();

                  const diaFormateado = dia.toString().padStart(2, '0');
                  const mesFormateado = mes.toString().padStart(2, '0');

                  return `${diaFormateado}/${mesFormateado}/${anio}`;
                }

                return (
                  <tr class={index === 0 ? divider : ""}>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{codebar}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{producto}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{marca}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{cantidad}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{precio}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{categoria}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{formatearFecha(fecha)}</td>
                  </tr>
                )
              })}
      </tbody>
    </table>
  </div>

  <div class="rounded-b-lg border-t border-gray-200 px-4 py-2">
    <ol class="flex justify-end gap-1 text-xs font-medium">
      <li>
        <a
          href="#"
          class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span class="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>

      <li>
        <a
          href="#"
          class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          1
        </a>
      </li>

      <li class="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
        2
      </li>

      <li>
        <a
          href="#"
          class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          3
        </a>
      </li>

      <li>
        <a
          href="#"
          class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          4
        </a>
      </li>

      <li>
        <a
          href="#"
          class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span class="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ol>
  </div>
</div>
          

    </main>
  )
}
/* <table
      <div class=" w-full rounded-lg border border-gray-200 dark:border-gray-700">
        <div class=" w-full rounded-t-lg">
            class=" w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
          >
            <thead class="ltr:text-left rtl:text-right">
              <tr class="w-full">
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  codebar
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  producto
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  marca
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  cantidad
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  precio
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  categoria
                </th>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  fecha
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              {producto.map(({ cantidad, categoria, codebar, fecha, marca, precio, producto }, index) => {
                const divider = "[&>*]:whitespace-nowrap [&>*]:px-4 [&>*]:py-2"
                function formatearFecha(fecha: Date) {
                  const dia = fecha.getDate();
                  const mes = fecha.getMonth() + 1;
                  const anio = fecha.getFullYear();

                  const diaFormateado = dia.toString().padStart(2, '0');
                  const mesFormateado = mes.toString().padStart(2, '0');

                  return `${diaFormateado}/${mesFormateado}/${anio}`;
                }

                return (
                  <tr class={index === 0 ? divider : ""}>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{codebar}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{producto}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{marca}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{cantidad}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{precio}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{categoria}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{formatearFecha(fecha)}</td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>

        <div class="w-full rounded-b-lg border-t border-gray-200 px-4 py-2 dark:border-gray-700">
          <ol class="flex justify-end gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              >
                <span class="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                class="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              >
                1
              </a>
            </li>

            <li
              class="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 dark:text-white"
            >
              2
            </li>

            <li>
              <a
                href="#"
                class="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                class="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              >
                4
              </a>
            </li>

            <li>
              <a
                href="#"
                class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              >
                <span class="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </div> */