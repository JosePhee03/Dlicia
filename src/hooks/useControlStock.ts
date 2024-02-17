import { useState } from "preact/hooks";
import { UpdateControlStock } from "../db/types-db";
import { ControlStockStore, controlStockStore } from "../store/ControlStockStore";

export function useControlStock(): ControlStockStore {
  const [controlStock, setControlStock] = useState<UpdateControlStock[]>(controlStockStore.getState().controlStock)
  const [isLoading, setIsLoading] = useState<boolean>(controlStockStore.getState().isLoading)
  const [isError, setIsError] = useState<boolean>(controlStockStore.getState().isError)

  controlStockStore.subscribe(({ controlStock, isLoading, isError }) => {
    setControlStock(controlStock)
    setIsLoading(isLoading)
    setIsError(isError)
  })


  return {
    controlStock,
    reset: controlStockStore.getState().reset,
    saveAll: controlStockStore.getState().saveAll,
    add: controlStockStore.getState().add,
    remove: controlStockStore.getState().remove,
    isLoading,
    isError
  }

}