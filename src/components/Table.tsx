import { useEffect, useRef, useState } from "preact/hooks";
import { DIRECTION, Producto } from "../db/types-db";
import { Button } from "./Button";
import { useProductosStore } from "../hooks/useProductosStore";
import { useControlStock } from "../hooks/useControlStock";
import { createPortal } from "preact/compat";
import { Input } from "./Input";

export function Table() {
  const { productos, fetch, isLoading, toggleDirection, direction } = useProductosStore()

  const fetchGetProductos = () => fetch()

  return (
    <div class="flex flex-col gap-2 md:gap-4 pb-16">
      <AnnouncementProducto />
      <form class="flex gap-2 items-end" >
        <div class="relative flex flex-col max-w-sm">
          <Input id="input-search" label="Buscar producto por nombre" name="input-search" type="text" value="" />
          <button type="reset" class="inline-block rounded-full p-1 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 absolute bottom-0.5 right-1 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 "><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
        <Button className="max-w-16 h-10" type="button" title="Buscar producto">Buscar</Button>
      </form>
      <div class="flex justify-between items-center flex-wrap">

        <TableButtonController />
      </div>
      <div class=" rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="overflow-x-auto rounded-t-lg">
          <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
            <thead class="ltr:text-left rtl:text-right">
              <tr>
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                </th>
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
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                  <button onClick={toggleDirection} class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                      {direction === DIRECTION.ASC
                        ? <><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="M11 12h4" /><path d="M11 16h7" /><path d="M11 20h10" /></>
                        : <><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="M11 4h10" /><path d="M11 8h7" /><path d="M11 12h4" /></>
                      }


                    </svg>
                    fecha
                  </button>
                </th>
              </tr>
            </thead>
            <TBody />
          </table>
          {productos.length === 0 && !isLoading &&
            <span class="flex w-full items-center justify-center p-4"><Button type="button" onClick={fetchGetProductos}>Cargar Tabla</Button></span>
          }
        </div>

      </div>
    </div>
  )
}

function TableButtonController() {

  return (
    <div class="flex w-full items-center flex-wrap gap-4">

      <div class="flex w-full justify-between">
        <FilterController />
        <Pagination />
      </div>
    </div>
  )
}

function AnnouncementProducto() {
  const { controlStock, reset, saveAll, isLoading } = useControlStock()

  if (controlStock.length === 0) return null

  return (
    createPortal(
      <div class="relative overscroll-contain">
        <div class="fixed left-0 right-0 bottom-0 z-40 flex items-center justify-between gap-4 bg-blue-600 px-4 py-3 text-white">
          <div class="flex gap-4 items-center">
            <Button type="button" onClick={saveAll} className="flex gap-2 items-center dark:bg-white dark:text-gray-800">
              <span>Guardar Todo</span>
              {isLoading &&
                <div
                  class="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span>
                </div>
              }
            </Button>
            <p class="text-md font-medium">
              Hay {controlStock.length} cambio{controlStock.length > 1 && "s"}
            </p>
          </div>

          <button
            aria-label="Close"
            onClick={reset}
            class="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      , document.getElementById("portal")!))
}

function TBody() {

  const { pageProductos: productos, isLoading } = useProductosStore()

  return (
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
      {isLoading
        ?
        <tr>
          <td class="px-2 py-4"><div class="w-full animate-pulse rounded bg-slate-700 h-4 "></div></td>
          <td class="px-2 py-4"><div class="w-full animate-pulse rounded bg-slate-700 h-4 "></div></td>
          <td class="px-2 py-4"><div class="w-full animate-pulse rounded bg-slate-700 h-4 "></div></td>
          <td class="px-2 py-4"><div class="w-full animate-pulse rounded bg-slate-700 h-4 "></div></td>
          <td class="px-2 py-4"><div class="w-full animate-pulse rounded bg-slate-700 h-4 "></div></td>
          <td class="px-2 py-4"><div class="w-full animate-pulse rounded bg-slate-700 h-4 "></div></td>
          <td class="px-2 py-4"><div class="w-full animate-pulse rounded bg-slate-700 h-4 "></div></td>
          <td class="px-2 py-4"><div class="w-full animate-pulse rounded bg-slate-700 h-4 "></div></td>
          <td class="px-2 py-4"><div class="w-full animate-pulse rounded bg-slate-700 h-4 "></div></td>
        </tr>
        : productos.map((producto, index) => <Row producto={producto} index={index} />)
      }

    </tbody >
  )
}

interface RowProps {
  producto: Producto
  index: number
}

function Row({ producto, index }: RowProps) {
  const { add, remove, controlStock } = useControlStock()

  const [isEditeble, setIsEditeble] = useState(false)
  const [isSave, setIsSave] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const refInputCodebar = useRef<HTMLInputElement>(null)
  const refInputCantidad = useRef<HTMLInputElement>(null)
  const refInputPrecio = useRef<HTMLInputElement>(null)

  const { cantidad, categoria, codebar, fecha, marca, precio, producto: nombre } = producto
  const fecha2 = new Date(fecha)

  const divider = "[&>*]:whitespace-nowrap [&>*]:px-2 [&>*]:py-2"
  function formatearFecha(fecha: Date) {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const diaFormateado = dia.toString().padStart(2, '0');
    const mesFormateado = mes.toString().padStart(2, '0');

    return `${diaFormateado}/${mesFormateado}/${anio}`;
  }

  useEffect(() => {

    if (refInputCodebar.current != null && refInputCantidad.current != null && refInputPrecio.current != null) {
      const selectControlStock = controlStock.find(c => c.codebar === codebar)
      if (selectControlStock != undefined) {
        refInputCantidad.current.value = selectControlStock.cantidad.toString()
        refInputCodebar.current.value = selectControlStock.codebar.toString()
        refInputPrecio.current.value = selectControlStock.precio.toString()
        setIsSelected(true)
      } else {
        refInputCantidad.current.value = cantidad.toString()
        refInputCodebar.current.value = codebar.toString()
        refInputPrecio.current.value = precio.toString()
        setIsSelected(false)
        setIsSave(false)
      }
    }
  })

  const edit = () => {
    setIsSave(false)
    setIsEditeble(true)
  }

  const addControlStock = () => {
    if (refInputCodebar.current != null && refInputCantidad.current != null && refInputPrecio.current != null) {
      add({
        cantidad: parseInt(refInputCantidad.current.value),
        codebar: parseInt(refInputCodebar.current.value),
        precio: parseInt(refInputPrecio.current.value)
      })
    }
    setIsEditeble(false)
    setIsSave(true)
    setIsSelected(true)
  }

  const reset = () => {

    if (refInputCodebar.current != null && refInputCantidad.current != null && refInputPrecio.current != null) {
      remove(parseInt(refInputCodebar.current.value))
      refInputCantidad.current.value = cantidad.toString()
      refInputCodebar.current.value = codebar.toString()
      refInputPrecio.current.value = precio.toString()
      setIsSave(false)
      setIsSelected(false)
      setIsEditeble(false)
    }
  }

  return (
    <tr key={codebar} class={(index === 0 ? divider : "") + (isSelected ? " bg-gray-100 dark:bg-gray-700" : "")}>
      <td class="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-gray-200">


        <span
          class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <button
            onClick={!isEditeble ? edit : () => setIsEditeble(false)}
            type="button"
            class="inline-block rounded p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 focus:relative  dark:hover:bg-gray-800"
            title="Editar Producto"
          >
            {isSave || isSelected && !isEditeble
              ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 stroke-green-400"><path d="M20 6 9 17l-5-5" /></svg>
              : isEditeble ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 stroke-red-400"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                : <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>

            }

          </button>
          {!isEditeble
            ? null
            : <>
              <button
                class="inline-block rounded p-2 text-gray-700 hover:bg-gray-50 focus:relative dark:text-gray-200 dark:hover:bg-gray-800"
                title="Guardar cambios"
                onClick={addControlStock}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
              </button>

              <button
                class="inline-block rounded p-2 text-gray-700 hover:bg-gray-50 focus:relative dark:text-gray-200 dark:hover:bg-gray-800"
                onClick={reset}
                title="Descartar Cambios"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
              </button>
            </>
          }

        </span>

      </td>
      <td class="whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-white"><input ref={refInputCodebar} readOnly className="bg-transparent max-w-36 px-2 text-gray-700 dark:text-gray-200" type="number" /></td>
      <td class="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-gray-200"><input value={nombre} readOnly className="bg-transparent max-w-48 px-2 text-gray-700 dark:text-gray-200" type="text" /></td>
      <td class="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-gray-200">{marca}</td>
      <td class="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-gray-200"><input ref={refInputCantidad} readOnly={!isEditeble} className="bg-transparent max-w-16 px-2 text-gray-700 dark:text-gray-200" type="number" /></td>
      <td class="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-gray-200"><input ref={refInputPrecio} readOnly={!isEditeble} className="bg-transparent max-w-16 px-2 text-gray-700 dark:text-gray-200" type="number" /></td>
      <td class="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-gray-200">{categoria}</td>
      <td class="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-gray-200">{formatearFecha(fecha2)}</td>
    </tr >
  )
}

function Pagination() {
  const { total, limit, page, nextPage, previewPage, reload } = useProductosStore()
  const pages = Math.floor(total / limit)

  return (
    <div class="inline-flex items-center justify-center gap-3">


      <button
        onClick={reload}
        class="hover:bg-gray-50 dark:hover:bg-gray-800 inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>

      </button>

      <button
        disabled={page === 0}
        onClick={previewPage}
        class="hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
      >
        <span class="sr-only">Next Page</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <p class="text-xs text-gray-900 dark:text-white">
        {page}
        <span class="mx-0.25">/</span>
        {pages}
      </p>

      <button
        disabled={total < page * limit}
        onClick={nextPage}
        class="hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
      >
        <span class="sr-only">Next Page</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

function FilterController() {
  return (
    <div class="relative">
      <details class="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          class="flex cursor-pointer items-center focus:ring gap-2 border rounded-md transition px-4 h-8 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>

          <span class="text-sm font-medium">Filtro</span>

          <span class="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </summary>

        <div class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
          <div
            class="w-96 rounded border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
          >
            <header class="flex items-center justify-between p-4">
              <span class="text-sm text-gray-700 dark:text-gray-200"> 0 Selected </span>

              <button
                type="button"
                class="text-sm text-gray-900 underline underline-offset-4 dark:text-white"
              >
                Reset
              </button>
            </header>

            <ul class="space-y-1 border-t border-gray-200 p-4 dark:border-gray-700">
              <li>
                <label for="FilterInStock" class="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="FilterInStock"
                    class="size-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
                  />

                  <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                    In Stock (5+)
                  </span>
                </label>
              </li>

              <li>
                <label for="FilterPreOrder" class="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="FilterPreOrder"
                    class="size-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
                  />

                  <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Pre Order (3+)
                  </span>
                </label>
              </li>

              <li>
                <label for="FilterOutOfStock" class="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="FilterOutOfStock"
                    class="size-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
                  />

                  <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Out of Stock (10+)
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  )
}