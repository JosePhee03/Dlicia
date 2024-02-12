import { createClient } from "@libsql/client"
import { PRODUCTO_COLUMN, Categoria, CreateProducto, DIRECTION, Marca, Producto, Page, GetProductoParams, ControlStock } from "./types-db";

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

  const marca: Marca[] = result.rows.map(row => ({
    id: row.id as number,
    marca: row.marca as string,
  }));
  return marca
}

const getMarcaByName = async (name: string): Promise<Marca> => {

  const sql = "SELECT * FROM Marca WHERE marca LIKE ?"

  const selects = {
    sql,
    args: [name]
  }

  const result = await client.execute(selects);

  const [marcas]: Marca[] = result.rows.map(row => ({
    id: row.id as number,
    marca: row.marca as string,
  }));

  console.log({ MARCA: marcas })
  return marcas
}

const getCategoriaByName = async (name: string): Promise<Categoria> => {

  const sql = "SELECT * FROM Categoria WHERE categoria LIKE ?"

  const selects = {
    sql,
    args: [name]
  }

  const result = await client.execute(selects);

  const [categoria]: Categoria[] = result.rows.map(row => ({
    id: row.id as number,
    categoria: row.categoria as string,
  }));

  console.log({ CATEGORIA: categoria })
  return categoria

}

export const postProducto = async ({ codebar, producto, marca, categoria, cantidad, precio }: CreateProducto) => {

  console.log({ categoria, marca })

  const fecha = new Date().toISOString()

  const transaction = await client.transaction("write");

  let marcaId = 0
  let categoriaId = 0

  try {
    if (await getMarcaByName(marca) == undefined) {
      await transaction.execute({
        sql: "INSERT INTO Marca (marca) VALUES (?)",
        args: [marca]
      });
    }

    if (await getCategoriaByName(categoria) == undefined) {
      await transaction.execute({
        sql: "INSERT INTO Categoria (categoria) VALUES (?)",
        args: [categoria]
      });
    }

    const categoriaDB = await transaction.execute({
      sql: "SELECT id FROM Categoria WHERE categoria = ?",
      args: [categoria]
    })
    const marcaDB = await transaction.execute({
      sql: "SELECT id FROM Marca WHERE marca = ?",
      args: [marca]
    })

    categoriaId = categoriaDB.rows[0].id as number
    marcaId = marcaDB.rows[0].id as number

    console.log({ categoriaId, marcaId })

    if (await getProducto(codebar) == undefined) {
      await transaction.execute({
        sql: "INSERT INTO Producto (id, producto, marca_id, categoria_id)  VALUES (?, ?, ?, ?)",
        args: [codebar, producto, marcaId, categoriaId],
      });
    } else {

      await transaction.execute({
        sql: "UPDATE Producto SET producto = ?, marca_id = ?, categoria_id = ? WHERE id = ?",
        args: [producto, marcaId, categoriaId, codebar],
      });

    }

    if (await getControlStock(codebar) == undefined) {
      await transaction.execute({
        sql: "INSERT INTO Control_Stock (producto_id, cantidad, precio, fecha)  VALUES (?, ?, ?, ?)",
        args: [codebar, cantidad, precio, fecha],
      });
    } else {

      await transaction.execute({
        sql: "UPDATE Control_Stock SET cantidad = ?, precio = ?, fecha = ? WHERE producto_id = ?",
        args: [cantidad, precio, fecha, codebar],
      });
    }

    await transaction.commit();
  } catch (e) {
    console.log(e)
    await transaction.rollback()
    throw new Error()
  } finally {
    await transaction.close();
  }

}




export const getProductos = async ({ page = 0, limit = 20, sort = PRODUCTO_COLUMN.FECHA, direction = DIRECTION.DESC }: GetProductoParams): Promise<Page<Producto>> => {
  const offset = page * limit

  const sql: string = `
  SELECT 
    Producto.id AS codebar,
    Producto.producto AS producto,
    Marca.marca AS marca,
    Categoria.categoria AS categoria,
    Control_Stock.cantidad AS cantidad,
    Control_Stock.precio AS precio,
    Control_Stock.fecha AS fecha
  FROM Producto 
   LEFT JOIN Marca ON Producto.marca_id = Marca.id 
   LEFT JOIN Categoria ON Producto.categoria_id = Categoria.id 
   LEFT JOIN Control_Stock ON Producto.id = Control_Stock.producto_id
  GROUP BY Producto.id ORDER BY Control_Stock.fecha DESC LIMIT $limit OFFSET $offset;
`

  const selects = {
    sql,
    args: { limit, offset }
  }

  const result = await client.execute(selects);

  const Producto: Producto[] = result.rows.map(row => ({
    codebar: row.codebar as number,
    producto: row.producto as string,
    marca: row.marca as string,
    categoria: row.categoria as string,
    cantidad: row.cantidad as number,
    precio: row.precio as number,
    fecha: new Date(row.fecha as string)
  }));

  const PageOfProductos: Page<Producto> = {
    content: Producto,
    limit,
    page,
    offset,
    size: result.rows.length,
    next: page + 1,
    preview: Math.max(page - 1, 0),
    direction,
    sort
  }

  return PageOfProductos

}

const getControlStock = async (codebar: number): Promise<ControlStock> => {

  const sql = `
    SELECT 
      Control_Stock.id AS id,
      Control_Stock.producto_id AS codebar,
      Control_Stock.cantidad AS cantidad,
      Control_Stock.precio AS precio,
      Control_Stock.fecha AS fecha
    FROM Control_Stock
    WHERE Control_Stock.producto_id = ?`

  const selects = {
    sql,
    args: [codebar]
  }

  const result = await client.execute(selects);

  const [controlStock]: ControlStock[] = result.rows.map(row => ({
    id: row.id as number,
    codebar: row.codebar as number,
    cantidad: row.cantidad as number,
    precio: row.precio as number,
    fecha: new Date(row.fecha as string)
  }));

  return controlStock
}

export const getProducto = async (codebar: number): Promise<Producto> => {

  const sql = `
    SELECT 
      Producto.id AS codebar,
      Producto.producto AS producto,
      Marca.marca AS marca,
      Categoria.categoria AS categoria,
      Control_Stock.cantidad AS cantidad,
      Control_Stock.precio AS precio,
      Control_Stock.fecha AS fecha
    FROM Producto
    LEFT JOIN Marca ON Producto.marca_id = Marca.id 
    LEFT JOIN Categoria ON Producto.categoria_id = Categoria.id 
    LEFT JOIN Control_Stock ON Producto.id = Control_Stock.producto_id
    WHERE Producto.id = ? GROUP BY codebar`

  const selects = {
    sql,
    args: [codebar]
  }

  const result = await client.execute(selects);

  const [producto]: Producto[] = result.rows.map(row => ({
    codebar: row.codebar as number,
    producto: row.producto as string,
    marca: row.marca as string,
    categoria: row.categoria as string,
    cantidad: row.cantidad as number,
    precio: row.precio as number,
    fecha: new Date(row.fecha as string)
  }));

  return producto;
}