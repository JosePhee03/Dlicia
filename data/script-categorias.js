import fs from "node:fs"
import path from "node:path";
import { fileURLToPath } from "node:url";

const categorias = new Set;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

fs.readFile(__dirname + '/data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      return;
    }
  
    // Convierte el contenido JSON en un objeto JavaScript
    const jsonData = JSON.parse(data);

    jsonData.map(item => {
        categorias.add(item.Categoria)
  });
  
  let sqlQueries = []

  for (const categoria of categorias.values()) {
    sqlQueries.push(`INSERT INTO Categoria (categoria) VALUES ('${categoria}');`)
  }
    
    // Escribe las consultas SQL en un archivo
    fs.writeFile(__dirname + '/output.sql', sqlQueries.join('\n'), err => {
      if (err) {
        console.error('Error al escribir el archivo SQL:', err);
        return;
      }
      console.log('Archivo SQL creado correctamente.');
    });
  });

 