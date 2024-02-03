export interface Categoria {
    id: number,
    categoria: string
}

export interface Marca {
    id: number,
    marca: string
}

export interface CreateProducto {
    codebar: number
    producto: string
    categoriaId: number
    marcaId: number
}

export interface CreateControlStrock {
    productoId: number
    cantidad: number
}

export interface CreateControlPrecio {
    productoId: number
    precio: number
}