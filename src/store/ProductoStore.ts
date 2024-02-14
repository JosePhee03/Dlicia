import {createStore} from 'zustand/vanilla'
import { DIRECTION, GetProductoParams, Producto } from '../db/types-db'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getProductos } from '../db/client'

interface ProductoStore {
    productos: Producto[]
    direction: DIRECTION
    fetch: (page: number) => void
    toggleDirection: () => void
    reset: () => void
}

const productosStore = createStore<ProductoStore, [["zustand/persist", unknown]]>(persist(
    (set, get) => ({
    productos: [],
    direction: DIRECTION.DESC,
    fetch: async (page) => { 
        const response = await getProductos({page, limit: 20, direction: get().direction})
        set((prevState) => ({  productos: [...prevState.productos, ...response.content] }))
    },
    toggleDirection: () => {
        const direction = get().direction === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC
        set(() => ({  productos: [], direction }))
    },
    reset: () => set(() => ({productos: []}))
    }),
    {
        name: "productos-store",
        storage: createJSONStorage(() => sessionStorage)
    }
))