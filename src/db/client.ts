import { createClient } from "@libsql/client"
import { SUMMARY_COLUMN, Categoria, CreateControlPrecio, CreateControlStrock, CreateProducto, DIRECTION, Marca, Summary, SummaryParams, SummaryResponse } from "./types-db";

const client = createClient({
    url: import.meta.env.VITE_DATABASE_URL ?? "",
    authToken: import.meta.env.VITE_DATABASE_TOKEN ?? ""
})

export const getCategorias = async (): Promise<Categoria[]> => {
    const sql = "SELECT * FROM Categoria"
  
    const result = await client.execute(sql);
    const categorias: Categoria[] = result.rows.map(row => ({
        id: row.id as number,
        categoria: row.categoria as string,
      }));
    return categorias
}

export const getMarcas = async (): Promise<Marca[]> => {
    const sql = "SELECT * FROM Marca"
  
    const result = await client.execute(sql);

    const categorias: Marca[] = result.rows.map(row => ({
        id: row.id as number,
        marca: row.marca as string,
      }));
    return categorias
}

export const postProducto = async ({codebar, producto, marcaId, categoriaId}: CreateProducto) => {
    const sql = `INSERT INTO Producto (id, producto, marca_id, categoria_id) VALUES (?, ?, ?, ?)`

  const inserts = {
          sql,
          args: [codebar, producto, marcaId, categoriaId]
        }

    const result = await client.execute(inserts)

    return result
}

export const postControlStock = async ({productoId, cantidad }: CreateControlStrock) => {
  const sql = `INSERT INTO Control_Stock (producto_id, cantidad, fecha) VALUES (?, ?, ?)`

  const fecha = new Date().toISOString()

  const inserts = {
          sql,
          args: [productoId, cantidad, fecha]
        }

  const result = await client.execute(inserts)

  return result
}

export const postControlPrecio = async ({productoId, precio }: CreateControlPrecio) => {
  const sql = `INSERT INTO Control_Precio (producto_id, precio, fecha) VALUES (?, ?, ?)`

  const fecha = new Date().toISOString()

  const inserts = {
          sql,
          args: [productoId, precio, fecha]
        }

  const result = await client.execute(inserts)

  return result
}

export const getSummary = async ({ page = 0, limit = 20, sort = SUMMARY_COLUMN.FECHA, direction = DIRECTION.DESC }: SummaryParams): Promise<SummaryResponse> => {
  const offset = page * limit
  
  const sql = "SELECT Producto.id AS codebar, Producto.producto AS producto, Marca.marca AS marca, Categoria.categoria AS categoria, Control_Stock.cantidad AS cantidad, Control_Precio.precio AS precio, MAX(Control_precio.fecha) AS fecha FROM Producto LEFT JOIN Marca ON Producto.marca_id = Marca.id LEFT JOIN Categoria ON Producto.categoria_id = Categoria.id LEFT JOIN Control_Precio ON Producto.id = Control_precio.producto_id LEFT JOIN Control_Stock ON Producto.id = Control_Stock.producto_id GROUP BY Producto.id ORDER BY fecha DESC LIMIT $limit OFFSET $offset"

  const selects = {
    sql,
    args: {limit, offset}
  }

    const result = await client.execute(selects);

  const summary: Summary[] = result.rows.map(row => ({
    codebar: row.codebar as number,
    producto: row.producto as string,
    marca: row.marca as string,
    categoria: row.categoria as string,
    cantidad: row.cantidad as number,
    precio: row.precio as number,
    fecha: new Date(row.fecha as string)
  }));

  const summaryResponse: SummaryResponse = {
    content: summary,
    limit,
    page,
    offset,
    size: result.rows.length,
    next: page + 1,
    preview: Math.max(page - 1, 0),
    direction,
    sort
  }

  return summaryResponse

}