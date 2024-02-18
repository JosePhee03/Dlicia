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
    categoria: string
    marca: string
    cantidad: number
    precio: number
}

export enum DIRECTION {
    ASC = "ASC",
    DESC = "DESC"
}

export enum PRODUCTO_COLUMN {
    CODEBAR = "codebar",
    PRODUCTO = "producto",
    MARCA = "marca",
    CATEGORIA = "categoria",
    CANTIDAD = "cantidad",
    PRECIO = "precio",
    FECHA = "fecha"
}

export interface Producto {
    codebar: number
    producto: string
    marca: Marca["marca"]
    categoria: Categoria["categoria"]
    cantidad: number
    precio: number
    fecha: Date
}

export interface Page<T> {
    content: T[]
    limit: number
    page: number
    size: number
    total: number
}
export interface GetProductosParams {
    page: number,
    limit: number,
    direction?: DIRECTION
    query?: string
}

export interface UpdateControlStock {
    cantidad: number
    precio: number
    codebar: number
}

export interface ControlStock {
    id: number
    codebar: number
    precio: number
    cantidad: number
    fecha: Date
}