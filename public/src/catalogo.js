// src/catalogo.js
let products = [];

async function loadProducts() {
    try {
        console.log('Intentando cargar productos...');
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos:', data);
        products = data;
        displayProducts(products);
        updateFilters();
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        document.getElementById('productList').innerHTML = `<p>Error al cargar los productos: ${error.message}</p>`;
    }
}

function displayProducts(productsToShow) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    if (productsToShow.length === 0) {
        productList.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 mb-4';
        productCard.innerHTML = `
            <div class="product-card">
                <img src="/${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-brand">Marca: ${product.brand}</p>
                <p class="product-code">Código: ${product.code}</p>
                <p class="product-category">Categoría: ${product.category}</p>
                <p class="product-availability ${product.availability ? '' : 'out-of-stock'}">
                    ${product.availability ? 'Disponible' : 'No disponible'}
                </p>
                <p class="product-price">Precio: $${product.price.toFixed(2)}</p>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Función para actualizar los filtros
function updateFilters() {
    const categories = [...new Set(products.map(p => p.category))];
    const brands = [...new Set(products.map(p => p.brand))];

    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

// Función para aplicar los filtros
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    const selectedBrand = document.getElementById('brandFilter').value;

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) &&
        (selectedCategory === '' || product.category === selectedCategory) &&
        (selectedBrand === '' || product.brand === selectedBrand)
    );

    displayProducts(filteredProducts);
}

document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('categoryFilter').addEventListener('change', applyFilters);
document.getElementById('brandFilter').addEventListener('change', applyFilters);

// Cargar productos al iniciar la página
loadProducts();