import { persist } from "zustand/middleware"
import { UpdateControlStock } from "../db/types-db"
import { createStore } from "zustand"
import { updateControlStock } from "../db/client"

export interface ControlStockStore {
    controlStock: UpdateControlStock[]
    reset: () => void
    saveAll: () => Promise<void>
    add: (controlstock: UpdateControlStock) => void
    remove: (codebar: number) => void
    isLoading: boolean
    isError: boolean

}

export const controlStockStore = createStore<ControlStockStore, [["zustand/persist", unknown]]>(persist(
    (set, get) => ({
        controlStock: [],
        reset: () => set(() => ({ controlStock: [] })),
        saveAll: async () => {
            try {
                set(() => ({ isLoading: true }))
                await updateControlStock(get().controlStock)
                set(() => ({ isError: false, controlStock: [] }))
            } catch (error) {
                set(() => ({ isError: true }))
            } finally {
                set(() => ({ isLoading: false }))
            }
        },
        add: (newControlStock) => set((prevState) => {
            if (prevState.controlStock.some(c => c.codebar === newControlStock.codebar)) {
                const newControlStocks = prevState.controlStock.map((c) => c.codebar === newControlStock.codebar ? newControlStock : newControlStock)
                return { controlStock: newControlStocks }
            }
            return { controlStock: [...prevState.controlStock, newControlStock] }

        }),
        remove: (codebar) => set(({ controlStock }) => {
            const newControlStok = controlStock.filter((cs) => cs.codebar !== codebar)
            return { controlStock: newControlStok }
        }),
        isError: false,
        isLoading: false,
    }),
    {
        name: "control-stock-store",
    }
))