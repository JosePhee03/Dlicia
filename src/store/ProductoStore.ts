import { createStore } from 'zustand/vanilla'
import { DIRECTION, Producto } from '../db/types-db'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getProductos } from '../db/client'

export interface ProductoStore {
    productos: Producto[]
    direction: DIRECTION
    fetch: () => void
    toggleDirection: () => void
    reload: () => void
    nextPage: () => void
    previewPage: () => void
    cachedPage: Set<number>
    pageProductos: Producto[]
    page: number
    total: number
    limit: number
    size: number
    isLoading: boolean
    isError: boolean
}

export const productosStore = createStore<ProductoStore, [["zustand/persist", unknown]]>(persist(
    (set, get) => ({
        productos: [],
        pageProductos: [],
        direction: DIRECTION.DESC,
        page: 0,
        fetch: async () => {
            const { page, limit, direction, cachedPage } = get()
            if (!cachedPage.has(page)) {
                try {
                    set({ isLoading: true })
                    const response = await getProductos({ page, limit, direction })
                    set((prevState) => ({
                        productos: [...prevState.productos, ...response.content],
                        isError: false,
                        total: response.total,
                        size: response.size,
                        cachedPage: cachedPage.add(page)
                    }))
                } catch (error) {
                    set({ isError: true })
                } finally {
                    set({ isLoading: false })
                }
            }
            const startIndex = page * limit;
            const endIndex = limit * (page + 1)
            set((prevState) => ({ pageProductos: prevState.productos.slice(startIndex, endIndex) }))

        },
        toggleDirection: () => {
            const direction = get().direction === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC
            set(() => ({ productos: [], pageProductos: [], direction, cachedPage: new Set(), size: 0, total: 0, page: 0 }))
            get().fetch()
        },
        previewPage: () => {
            set((prevState) => ({ page: Math.max(prevState.page - 1, 0) }))
            get().fetch()
        },
        nextPage: () => {
            const { page, fetch, total, limit } = get()
            if (total < limit * page) return
            set((prevState) => ({ page: prevState.page + 1 }))
            fetch()
        },
        reload: () => set(() => ({ productos: [], pageProductos: [], cachedPage: new Set(), size: 0, total: 0, page: 0 })),
        cachedPage: new Set(),
        isError: false,
        isLoading: false,
        limit: 20,
        size: 0,
        total: 0
    }),
    {
        name: "productos-store",
        storage: createJSONStorage(() => sessionStorage)
    }
))