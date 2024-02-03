import fs from "node:fs"
import path from "node:path";
import { fileURLToPath } from "node:url";

const marcas = new Set;

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
      marcas.add(item.Marca)
  });
  
  let sqlQueries = []

  for (const marca of marcas.values()) {
    sqlQueries.push(`INSERT INTO Marca (marca) VALUES ('${marca}');`)
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

 