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
('Go Find 22', 'Minelab', 'GOFINE-22', 'Detector de Metales', TRUE, 9999.99, 'img/products/goFind22.webp'),
('Simplex+', 'Nokta Makro', 'SIMPLEX+', 'Detector de Metales', FALSE, 9999.99, 'img/products/simplex+.webp'),
('Tecknetics Eurotek Pro', 'Teknetics', 'EURO-PRO', 'Detector de Metales', TRUE, 9999.99, 'img/products/tekneticsEurotekPro.webp'),
('Rifle Beeman / Marksman', 'Beeman', '2063', 'Rifle Aire', TRUE, 9999.99, 'img/products/rifleBeeman.webp'),
('Rifle Pcp V-raptor Polimero Regulado Cal 5.5', 'Aztk', 'Pr900S', 'Rifle Pcp', TRUE, 9999.99, 'img/products/riflePcpAztk.webp'),
('Pistola Deportiva Cañon Corto Cal 4.5 ', 'Mendoza', 'PK-62-C-0227', 'Pistola de Salva', TRUE, 9999.99, 'img/products/PK-62-C-0227.webp');


