import fs from "node:fs"
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

fs.readFile(__dirname + '/data2.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      return;
    }
  
    // Convierte el contenido JSON en un objeto JavaScript
    const jsonData = JSON.parse(data);
    let sqlQueries = []

    jsonData.map(item => {
        sqlQueries.push(`INSERT INTO Producto (id, producto, marca_id, categoria_id) VALUES (${item.id}, "${item.Nombre}", ${item.marcaId}, ${item.categoriaId});`)
        sqlQueries.push(`INSERT INTO Control_Stock (producto_id, cantidad, fecha) VALUES (${item.id}, ${item.Cantidad}, "${new Date().toISOString()}");`)
        sqlQueries.push(`INSERT INTO Control_Precio (producto_id, precio, fecha) VALUES (${item.id}, ${item.Precio}, "${new Date().toISOString()}");`)
    });
  

    // Escribe las consultas SQL en un archivo
    fs.writeFile(__dirname + '/output.sql', sqlQueries.join('\n'), err => {
      if (err) {
        console.error('Error al escribir el archivo SQL:', err);
        return;
      }
      console.log('Archivo SQL creado correctamente.');
    });
  });
