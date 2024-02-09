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

    useEffect(() => {
        getCategorias()
            .then(response => {
                console.log(response)
                setCategorias(response)
            })
            .catch(e => {
                console.log("un ERROR", e)
            })
        getMarcas()
            .then(response => {
                console.log(response)
                setMarcas(response)
            })
            .catch(e => {
                console.log("un ERROR", e)
            })

        getProducto(parseInt(props.codebar))
            .then(response => {
                setProducto(response)
                console.log(response)
            })
            .catch(e => {
                console.log("un ERROR", e)
            })
    }, [])

    const handleToast = () => {
        Toast({ message: "PRUEBA" })
        console.log("TOAST")
    }

    const onSubmit = (event: SubmitEvent) => {
        event.preventDefault()
        setShowToast(true)
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const productoFromData: CreateProducto = {
            codebar: parseInt(formData.get("input-codebar") as string),
            producto: (formData.get("input-producto") as string).toUpperCase(),
            categoria: (formData.get("input-categoria") as string).toUpperCase(),
            marca: (formData.get("input-marca") as string).toUpperCase(),
            cantidad: parseInt(formData.get("input-cantidad") as string),
            precio: parseInt(formData.get("input-precio") as string)
        }

        console.log(productoFromData)
        postProducto(productoFromData).then((e) => console.log("EXITO", e)).catch((e) => console.log("NOSE PUTIOD", e))
    }

    return (
        <main class="w-full flex flex-col justify-center items-center gap-8">
            <h1 class="text-2xl font-bold">Buscar Producto</h1>

            <form onSubmit={onSubmit} className=" sm:w-full max-w-2xl flex flex-col gap-4">

                <div role="alert" class="rounded border-s-4 border-blue-500 bg-blue-50 p-4">
                    <strong class="block font-medium text-blue-800"> El producto "{props.codebar}" {producto != undefined ? "YA EXISTE" : "NO EXISTE"} </strong>
                    <p class="mt-2 text-sm text-blue-700">
                        <p>Rellene los campos y guarde el producto.</p>
                    </p>
                </div>

                <Input id="input-codebar" readOnly label="Código de barras" name="input-codebar" type="number" value={props.codebar}></Input>
                <Input id="input-producto" label="Producto" name="input-producto" type="text" value={producto?.producto ?? ""} />

                <Input list="categorias" value={producto?.categoria ?? ""} type="text" id="input-categoria" label="Categoria" name="input-categoria">
                    <datalist id="categorias">
                        {categorias.map(({ id, categoria }) => {
                            return <option key={id} value={categoria} />
                        })}
                    </datalist>
                </Input>

                <Input list="marcas" value={producto?.marca ?? ""} type="text" id="input-marca" label="Marca" name="input-marca">
                    <datalist id="marcas">
                        {marcas.map(({ id, marca }) => {
                            return <option key={id} value={marca} />
                        })}
                    </datalist>
                </Input>

                <Input id="input-cantidad" label="Cantidad" name="input-cantidad" type="number" value={producto?.cantidad ?? ""} />

                <Input id="input-precio" label="Precio Unitario proveedor" name="input-precio" type="number" value={producto?.precio ?? ""} />

                <Button type="submit" title="Crear nuevo producto">Guardar</Button>
            </form>

            {showToast && <Toast message="PRUEBA" />}

        </main>

    )
}