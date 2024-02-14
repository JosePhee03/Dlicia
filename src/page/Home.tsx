import { useState } from "preact/hooks";
import { route } from 'preact-router'
import { ChangeEvent } from "preact/compat";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";

import { CodebarScanner } from "../components/CodebarScanner";
import { Table } from "../components/Table";

export function Home() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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

  const getCodeScanner = (code: string) => {
    setValue(code)
    route(`/${code}`)
  }

  return (
    <main className="w-full py-8 h-screen flex flex-col gap-4">
      <h1 className="font-bold text-4xl text-gray-900 dark:text-white">D'licia</h1>
      <Button className="max-w-64" type="button" onClick={handleOpen} title="Buscar producto">Buscar Producto</Button>

      <Modal isOpen={open} onClose={handleClose} onSubmit={handleSubmit} titleModal="Buscar Producto">
        <Input label="Código de barras" onChange={handleChange} type="number" name="barcode" id="input-barcode" value={value} placeholder="77891235438734"></Input>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Escanear Código de barras</label>
        <div class="flex justify-center items-center">
          <CodebarScanner onScanner={(code) => getCodeScanner(code)} />
        </div>
      </Modal>

      <Table/>


    </main>
  )
}
