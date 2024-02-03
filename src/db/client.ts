import { createClient } from "@libsql/client"
import { Categoria, CreateControlPrecio, CreateControlStrock, CreateProducto, Marca } from "./types-db";

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