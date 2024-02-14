import { persist } from "zustand/middleware"
import { UpdateControlStock } from "../db/types-db"
import { createStore } from "zustand"
import { updateControlStock } from "../db/client"

interface UpdateControlStockStore {
    controlStock: UpdateControlStock[]
    reset: () => void
    save: () => void
}

const controlStockStore = createStore<UpdateControlStockStore, [["zustand/persist", unknown]]>(persist(
    (set, get) => ({
    controlStock: [],
    reset: () => set(() => ({controlStock: []})),
    save: async () => {
        await updateControlStock(get().controlStock)
    }
    }),
    {
        name: "new-productos-store",
    }
))