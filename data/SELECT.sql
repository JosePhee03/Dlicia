SELECT 
    Producto.id AS codigo,
    Producto.producto AS producto,
    Marca.marca AS marca,
    Categoria.categoria AS categoria,
    Control_Stock.cantidad AS cantidad,
    Control_Precio.precio AS precio,
    MAX(Control_precio.fecha) AS fecha
FROM
    Producto
LEFT JOIN 
    Marca ON Producto.marca_id = Marca.id
LEFT JOIN 
    Categoria ON Producto.categoria_id = Categoria.id
LEFT JOIN
    Control_Precio ON Producto.id = Control_precio.producto_id
LEFT JOIN
    Control_Stock ON Producto.id = Control_Stock.producto_id
GROUP BY 
    Producto.id
ORDER BY 
    fecha DESC
LIMIT 20 OFFSET 0;


CREATE TABLE Venta (
    id INTEGER PRIMARY KEY,
    producto_id INTEGER,
    venta INTEGER,
    precio INTEGER,
    fecha DATE,
    FOREIGN KEY (producto_id) REFERENCES Producto(id)
);

CREATE TRIGGER InsertarVenta AFTER UPDATE ON Control_Stock
WHEN NEW.cantidad < OLD.cantidad
BEGIN

    INSERT INTO Venta (producto_id, venta, fecha, precio)
    VALUES (NEW.producto_id, OLD.cantidad - NEW.cantidad, date('now'), NEW.precio);
END;


CREATE TABLE Control_Stock (
    id INTEGER PRIMARY KEY,
    producto_id INTEGER,
    cantidad INTEGER,
    precio INTEGER,
    fecha DATE,
    FOREIGN KEY (producto_id) REFERENCES Producto(id)
);

ALTER TABLE Venta ADD COLUMN precio INTEGER;