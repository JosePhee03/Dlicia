import { useEffect, useRef, useState } from "preact/hooks";
import { ControlStock, Producto } from "../db/types-db";
import { Pagination } from "./Pagination";
import { getProductos } from "../db/client";
import { Button } from "./Button";
import { ChangeEvent, ChangeEventHandler } from "preact/compat";

export function Table () {
  const [productos, setProductos] = useState<Producto[]>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(20)
  const [controlStock, setControlStock] = useState<ControlStock[]>([])


  const fetchGetProductos = () => {
    getProductos({ limit, page })
      .then(response => {
        setProductos(response.content)
        setPage(response.page)
        setLimit(response.limit)
        console.log(response)
      })
      .catch(response => console.log(response))
  }

    return (
      <div class="rounded-lg border border-gray-200 dark:border-gray-700">
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
                <th className="capitalize whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  fecha
                </th>
              </tr>
            </thead>
          {productos.length === 0 
                  ? <Button type="button" onClick={fetchGetProductos}>Cargar Tabla</Button> 
                  : <TBody setControlStock={setControlStock} productos={productos}/>
          }

          </table>
        </div>
        <Pagination/>
        </div> 
    )
}

interface TBodyProps {
  productos: Producto[]
  setControlStock: () => void
}

function TBody ({productos, setControlStock}: TBodyProps) {
  



  return (
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              {productos.map((producto, index) => {
                const divider = "[&>*]:whitespace-nowrap [&>*]:px-4 [&>*]:py-2"
                function formatearFecha(fecha: Date) {
                  const dia = fecha.getDate();
                  const mes = fecha.getMonth() + 1;
                  const anio = fecha.getFullYear();

                  const diaFormateado = dia.toString().padStart(2, '0');
                  const mesFormateado = mes.toString().padStart(2, '0');

                  return `${diaFormateado}/${mesFormateado}/${anio}`;
                }

                return <Row producto={producto} index={index}/>
              })}
            </tbody>
  )
}

interface RowProps {
  producto: Producto
  index: number
}

function Row ({producto, index}: RowProps) {
  const [isEditeble, setIsEditeble] = useState(false)
  const refInputCodebar = useRef<HTMLInputElement>(null)
  const refInputCantidad = useRef<HTMLInputElement>(null)
  const refInputPrecio = useRef<HTMLInputElement>(null)

  const Edit = () => {
    setIsEditeble(true)
  }

  const saveControlStock = () => {
    setControlStock()
  }

  return (
    <tr key={codebar} class={index === 0 ? divider : ""}>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
              

                    <span
                      class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                    >
                        <button
                        onClick={Edit}
                        type="button"
                        class="inline-block rounded border p-2 text-gray-700 hover:bg-gray-50 focus:relative dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                        title="Editar Producto"
                    >
                        <svg
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
                        </button>
                        {!isEditeble 
                          ? null
                          : <>
                            <button
                          class="inline-block rounded border p-2 text-gray-700 hover:bg-gray-50 focus:relative dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                          title="Guardar Producto"
                        >
                          <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                            fill="none"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-4 w-4">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        </button>
                        
                        <button
                          class="inline-block rounded border p-2 text-gray-700 hover:bg-gray-50 focus:relative dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                          title="Resetear Cambios"
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
                          ><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        </button>
                          </> 
                        }
                        
                      </span>
                    
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{codebar}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{producto}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{marca}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"><input ref={refInputCantidad} onChange={(e) => onChange(e)} className="bg-transparent w-full text-gray-700 dark:text-gray-200" type="number" value={cantidad}/></td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"><input ref={refInputPrecio} onChange={(e) => onChange(e)} className="bg-transparent w-full text-gray-700 dark:text-gray-200" type="number" value={precio}/></td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{categoria}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{formatearFecha(fecha)}</td>
                  </tr>
  )
}