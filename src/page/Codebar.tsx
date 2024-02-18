import { useEffect, useState } from "preact/hooks"
import { getCategorias, getMarcas, getProducto, postProducto } from "../db/client"
import { Categoria, CreateProducto, Marca, Producto } from "../db/types-db"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import Toast from "../components/Toast"

interface CodebarProps {
    codebar: string
}

export function Codebar(props: CodebarProps) {
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [marcas, setMarcas] = useState<Marca[]>([])
    const [producto, setProducto] = useState<Producto>()
    const [showToast, setShowToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchAllPRoductos = () => {
        getCategorias()
            .then(response => {
                setCategorias(response)
            })
            .catch(e => {
                console.log("un ERROR", e)
            })
        getMarcas()
            .then(response => {
                setMarcas(response)
            })
            .catch(e => {
                console.log("un ERROR", e)
            })

        getProducto(parseInt(props.codebar))
            .then(response => {
                setProducto(response)
            })
            .catch(e => {
                console.log("un ERROR", e)
            })
    }

    useEffect(() => {
        fetchAllPRoductos()
    }, [])

    const clearToast = () => {
        setTimeout(() => {
            setShowToast(false)
        }, 5000)
    }

    const onSubmit = (event: SubmitEvent) => {
        event.preventDefault()
        setShowToast(true)
        setLoading(true)
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const productoFromData: CreateProducto = {
            codebar: parseInt(formData.get("input-codebar") as string),
            producto: (formData.get("input-producto") as string).toUpperCase(),
            categoria: (formData.get("input-categoria") as string).toUpperCase(),
            marca: (formData.get("input-marca") as string).toUpperCase(),
            cantidad: parseInt(formData.get("input-cantidad") as string),
            precio: parseInt(formData.get("input-precio") as string)
        }

        postProducto(productoFromData)
            .then(() => {
                setError(false)
            }).catch(() => {
                setError(true)
            }).finally(() => {
                setLoading(false)
                clearToast()
                fetchAllPRoductos()
            })
    }

    return (
        <>
            <header class="flex gap-4 items-center">
                <a className="" href="/">
                    <svg className="dark:stroke-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                </a><h1 class="text-2xl font-bold dark:text-white">Buscar Producto</h1>

            </header>
            <main class="flex flex-col gap-8">

                <form onSubmit={onSubmit} className="flex flex-col gap-4">

                    <div role="alert" class="rounded border-s-4 border-blue-500 bg-blue-50 dark:border-blue-600/40 dark:bg-blue-900/40  p-4">
                        <strong class="block font-medium text-blue-800 dark:text-blue-100"> El producto "{props.codebar}" {producto != undefined ? "YA EXISTE" : "NO EXISTE"} </strong>
                        <p class="mt-2 text-sm text-blue-700 dark:text-blue-200">
                            <p>Rellene los campos y guarde el producto.</p>
                        </p>
                    </div>

                    <Input id="input-codebar" readOnly label="Código de barras" name="input-codebar" type="number" value={props.codebar}></Input>
                    <Input readOnly={loading} placeholder="Ej: HARINA" id="input-producto" label="Producto" name="input-producto" type="text" value={producto?.producto ?? ""} />

                    <Input readOnly={loading} placeholder="COCINA" list="categorias" value={producto?.categoria ?? ""} type="text" id="input-categoria" label="Categoria" name="input-categoria">
                        <datalist id="categorias">
                            {categorias.map(({ id, categoria }) => {
                                return <option key={id} value={categoria} />
                            })}
                        </datalist>
                    </Input>

                    <Input readOnly={loading} placeholder="Ej: SERENISIMA" list="marcas" value={producto?.marca ?? ""} type="text" id="input-marca" label="Marca" name="input-marca">
                        <datalist id="marcas">
                            {marcas.map(({ id, marca }) => {
                                return <option key={id} value={marca} />
                            })}
                        </datalist>
                    </Input>

                    <Input readOnly={loading} placeholder="Ej: 33" id="input-cantidad" label="Cantidad" name="input-cantidad" type="number" value={producto?.cantidad ?? ""} />

                    <Input readOnly={loading} placeholder="Ej: $100" id="input-precio" label="Precio" name="input-precio" type="number" value={producto?.precio ?? ""} />

                    <Button disabled={loading} type="submit" title="Crear nuevo producto">Guardar</Button>
                </form>

                {showToast && loading ?
                    <Toast message="Guardando el producto" type="loading" />
                    : showToast && !loading && error ?
                        <Toast message="Ucurrio un error al guardar el producto" type="error" />
                        : showToast && !loading && !error && <Toast message="Producto Guardado con exito" type="success" />}

            </main>
        </>

    )
}