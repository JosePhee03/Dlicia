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

export enum DIRECTION {
    ASC = "ASC",
    DESC = "DESC"
}

export enum SUMMARY_COLUMN {
    CODEBAR = "codebar",
    PRODUCTO = "producto",
    MARCA = "marca",
    CATEGORIA = "categoria",
    CANTIDAD = "cantidad",
    PRECIO = "precio",
    FECHA = "fecha"
}

export interface SummaryParams {
    limit: number,
    page: number,
    direction:string
    sort: string
}

export interface Summary {
    codebar: number
    producto: string
    marca: Marca["marca"]
    categoria: Categoria["categoria"]
    cantidad: number
    precio: number
    fecha: Date
} 

export interface SummaryResponse {
    content: Summary[]
    limit: number
    page: number
    offset: number
    size: number
    next: number
    preview: number
    direction: string
    sort: string
}