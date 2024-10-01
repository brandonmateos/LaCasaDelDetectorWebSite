DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    category VARCHAR(255) NOT NULL,
    availability BOOLEAN NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO products (name, brand, code, category, availability, price, image) VALUES
('Desbrozadora a gasolina 26cc', 'Truper', 'DES-26C', 'Jardineria', TRUE, 9999.99, 'img/products/DES-26C.jpg'),
('Rotomartillo inal. 1/2", 20V', 'Truper', 'ROTI-20A', 'Máquinas portátiles inalámbricas', TRUE, 9999.99, 'img/ROTI-20A.jpg'),
('Rotomartillo SDS Plus 5 Joules', 'Truper Industrial', 'ROEL-50N2', 'Máquinas portátiles', TRUE, 9999.99, 'img/products/ROEL-50N2.jpg'),
('Hacha cazadora 1 lb mango de nylon de 14"', 'Truper', 'HVE-1', 'Hachas', TRUE, 9999.99, 'img/products/HVE-1.jpg'),
('Cargador c/arrancador de 50 A', 'Truper', 'CARBA-50', 'Accesorios para auto', TRUE, 9999.99, 'img/products/CARBA-50.jpg'),
('Compresor de aire, lubricado 20L 2½HP', 'Pretul', 'COMP-20LP', 'Compresores y accesorios', TRUE, 9999.99, 'img/products/COMP-20LP.jpg'),
('Esmeriladora angular 4-1/2", 750W', 'Truper', 'ERGO-4570', 'Máquinas portátiles', TRUE, 9999.99, 'img/products/ERGO-4570.jpg'),
('Go Find 22', 'Minelab', 'GOFINE-22', 'Detector de Metales', TRUE, 9999.99, 'img/products/goFind22.jpg'),
('Simplex+', 'Nokta Makro', 'SIMPLEX+', 'Detector de Metales', FALSE, 9999.99, 'img/products/simplex+.webp'),
('Tecknetics Eurotek Pro', 'Teknetics', 'EURO-PRO', 'Detector de Metales', TRUE, 9999.99, 'img/products/tekneticsEurotekPro.jpg'),
('Rifle Beeman / Marksman', 'Beeman', '2063', 'Rifle Aire', TRUE, 9999.99, 'img/products/rifleBeeman.webp'),
('Rifle Pcp V-raptor Polimero Regulado Cal 5.5', 'Aztk', 'Pr900S', 'Rifle Pcp', TRUE, 9999.99, 'img/products/riflePcpAztk.webp'),
('Pistola Deportiva Cañon Corto Cal 4.5 ', 'Mendoza', 'PK-62-C-0227', 'Pistola de Salva', TRUE, 9999.99, 'PK-62-C-0227.png');