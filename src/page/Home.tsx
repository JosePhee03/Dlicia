import { useState } from "preact/hooks";
import { route } from 'preact-router'
import { ChangeEvent } from "preact/compat";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";

export function Home () {
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

    const handleClose = () => {
        setOpen(false);
    };
 
    const handleOpen = () => {
        setOpen(true);
    };

    const barcodeScan = () => {
      // TODO
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
    }

    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault()
      route(`/${value}`)
    }

  return (
    <main className="max-w-[640px] py-8 h-screen mx-auto flex flex-col gap-4">
      <h1 className="font-bold text-4xl">D'licia</h1>
      <Button className="max-w-64" type="button" onClick={handleOpen} title="Buscar producto">Buscar Producto</Button>
      <Modal isOpen={open} onClose={handleClose} onSubmit={handleSubmit} titleModal="Buscar Producto">
          <label class="font-semibold" htmlFor="input-barcode">Código de barras</label>
          <Input onChange={handleChange} type="number" name="barcode" id="input-barcode" value={value} placeholder="77891235438734"></Input>
          <Button className="w-full" type="button" onClick={barcodeScan} title="Escanear producto">Escanear producto</Button>
      </Modal>
    </main>
  )
}