DROP TABLE IF EXISTS products;

-- Crear la tabla de productos
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    code TEXT NOT NULL,
    category TEXT NOT NULL,
    availability BOOLEAN NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT NOT NULL
);

-- Insertar productos de prueba
INSERT INTO products (name, brand, code, category, availability, price, image) VALUES
('Martillo de carpintero', 'Stanley', 'STAN-001', 'Herramientas manuales', 1,  15.99, 'img/products/ROTI-20A.jpg'),
('Destornillador de precisión', 'Truper', 'TRUP-001', 'Herramientas manuales', 1,  5.99, 'img/ROTI-20A.jpg'),
('Cinta métrica', 'Truper', 'TRUP-002', 'Herramientas manuales', 1,  7.99, 'img/products/ROTI-20A.jpg'),
('Cinta airlar', 'Truper', 'TRUP-002', 'Herramientas manuales', 1,  7.99, 'img/products/ROTI-20A.jpg'),
('Llave ajustable', 'Truper', 'TRUP-003', 'Herramientas manuales', 1,  9.99, 'img/products/ROTI-20A.jpg');



-- Puedes agregar más productos siguiendo el mismo patrón