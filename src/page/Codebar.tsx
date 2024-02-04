import { useEffect, useState } from "preact/hooks"
import { getCategorias, getMarcas, postProducto } from "../db/client"
import { Categoria, CreateProducto, Marca } from "../db/types-db"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Select } from "../components/Select"

interface CodebarProps {
    codebar: string
}

export function Codebar(props: CodebarProps) {
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [marcas, setMarcas] = useState<Marca[]>([])

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
    }, [])

    const onSubmit = (event: SubmitEvent) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const productoFromData: CreateProducto = {
            codebar: parseInt(formData.get("input-codebar") as string),
            producto: formData.get("input-producto") as string,
            categoriaId: parseInt(formData.get("select-categoria") as string),
            marcaId: parseInt(formData.get("select-marca") as string)
        }

        postProducto(productoFromData).then((e) => console.log("EXITO", e)).catch((e) => console.log("NOSE PUTIOD", e))
    }

    return (
        <main class="w-full flex flex-col justify-center items-center gap-8">
            <h1 class="text-2xl font-bold">Buscar Producto: {props.codebar}</h1>

            <form onSubmit={onSubmit} className=" sm:w-full max-w-2xl flex flex-col gap-4">
                <article class=" rounded">
                    <p class="">El producto con código de barras {props.codebar} no exite.</p>
                    <p>Rellene los campos y guarde el producto.</p>
                </article>

                <Input id="input-codebar" readOnly label="Código de barras" name="input-codebar" type="number" value={props.codebar}></Input>
                <Input id="input-producto" label="Producto" name="input-producto" type="text" value="" />

                <Select id="select-categoria" label="Categoria" name="select-categoria" >
                    {categorias.map(({ id, categoria }) => {
                        return <option key={id} value={id}>{categoria}</option>
                    })}
                </Select>

                <Select id="select-marca" label="Marca" name="select-marca" >
                    {marcas.map(({ id, marca }) => {
                        return <option key={id} value={id}>{marca}</option>
                    })}
                </Select>

                <Button type="submit" title="Crear nuevo producto">Guardar</Button>
            </form>
        </main>

    )
}