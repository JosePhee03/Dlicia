import { useEffect, useState } from "preact/hooks"
import { getCategorias, getMarcas, postProducto } from "../db/client"
import { Categoria, CreateProducto, Marca } from "../db/types-db"
import { Button } from "../components/Button"

interface CodebarProps {
    codebar: string
}

export function Codebar (props: CodebarProps) {
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
        <>
            <h1>{props.codebar}</h1>
            <pre>{JSON.stringify(categorias)}</pre>
            <form onSubmit={onSubmit}>
            <label htmlFor="input-codebar">Codebar</label>
            <input readOnly id="input-codebar" name="input-codebar" type="number" value={props.codebar} />

            <label htmlFor="input-producto">Producto</label>
            <input required id="input-producto" name="input-producto" type="text" value="" />

            <label htmlFor="select-categoria">Categoria</label>
            <select id="select-categoria" name="select-categoria">
                {categorias.map(({id, categoria}) => {
                    return <option key={id} value={id}>{categoria}</option>
                })}
            </select>
            <label htmlFor="select-marca">Marca</label>
            <select className="" id="select-marca" name="select-marca">
                {marcas.map(({id, marca}) => {
                    return <option key={id} value={id}>{marca}</option>
                })}
            </select>
            <Button type="submit" title="Crear nuevo producto">Crear</Button>
            </form>
        </>

    ) 
}