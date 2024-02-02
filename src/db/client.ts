import { createClient } from "@libsql/client"

const client = createClient({
    url: import.meta.env.VITE_DATABASE_URL ?? "",
    authToken: import.meta.env.VITE_DATABASE_TOKEN ?? ""
})
export const getCategories = async () => {
    const sql = "SELECT categoria FROM Categoria"
  
  
    const rs = await client.execute(sql);
    return rs
}