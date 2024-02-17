import { useState } from "preact/hooks"
import { Producto } from "../db/types-db"
import { ProductoStore, productosStore } from "../store/ProductoStore"

export function useProductosStore(): ProductoStore {
  const [productos, setProductos] = useState<Producto[]>(productosStore.getState().productos)
  const [isLoading, setIsLoading] = useState<boolean>(productosStore.getState().isLoading)
  const [isError, setIsError] = useState<boolean>(productosStore.getState().isError)
  const [page, setPage] = useState(productosStore.getState().page)
  const [direction, setDirection] = useState(productosStore.getState().direction)
  const [limit, setLimit] = useState(productosStore.getState().limit)
  const [size, setSize] = useState(productosStore.getState().size)
  const [total, setTotal] = useState(productosStore.getState().total)
  const [pageProductos, setPageProductos] = useState(productosStore.getState().pageProductos)
  const [cachedPage, setCachedPage] = useState(productosStore.getState().cachedPage)

  productosStore.subscribe(({ productos }) => {
    setProductos(productos)
  })

  productosStore.subscribe(({ isLoading }) => {
    setIsLoading(isLoading)
  })

  productosStore.subscribe(({ isError }) => {
    setIsError(isError)
  })

  productosStore.subscribe(({ page }) => {
    setPage(page)
  })

  productosStore.subscribe(({ direction }) => {
    setDirection(direction)
  })

  productosStore.subscribe(({ limit }) => {
    setLimit(limit)
  })

  productosStore.subscribe(({ size }) => {
    setSize(size)
  })

  productosStore.subscribe(({ total }) => {
    setTotal(total)
  })

  productosStore.subscribe(({ pageProductos }) => {
    setPageProductos(pageProductos)
  })

  productosStore.subscribe(({ cachedPage }) => {
    setCachedPage(cachedPage)
  })

  return {
    size,
    limit,
    direction,
    page,
    productos,
    isLoading,
    isError,
    pageProductos,
    cachedPage,
    previewPage: productosStore.getState().previewPage,
    fetch: productosStore.getState().fetch,
    toggleDirection: productosStore.getState().toggleDirection,
    reload: productosStore.getState().reload,
    nextPage: productosStore.getState().nextPage,
    total
  }
}