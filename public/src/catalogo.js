let products = [];
const PRODUCTS_PER_PAGE = 24;
let currentPage = 1;
let isLoading = false;

async function loadProducts() {
    try {
        // Mostrar indicador de carga si existe
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.classList.remove('d-none');
        }

        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        products = data;
        updateFilters();
        displayProductsPage(1);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        document.getElementById('productList').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Error al cargar los productos: ${error.message}</p>
            </div>`;
    } finally {
        // Ocultar indicador de carga
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.classList.add('d-none');
        }
    }
}

function updateFilters() {
    if (!products.length) return;

    const categories = [...new Set(products.map(p => p.category))].sort();
    const brands = [...new Set(products.map(p => p.brand))].sort();

    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');

    categoryFilter.innerHTML = '<option value="">Todas las categorías</option>';
    brandFilter.innerHTML = '<option value="">Todas las marcas</option>';

    categories.forEach(category => {
        if (category) { // Solo agregar si la categoría no es null o vacía
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        }
    });

    brands.forEach(brand => {
        if (brand) { // Solo agregar si la marca no es null o vacía
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        }
    });
}

function getFilteredProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    const selectedBrand = document.getElementById('brandFilter').value;

    return products.filter(product => {
        const nameMatch = product.name?.toLowerCase().includes(searchTerm);
        const categoryMatch = !selectedCategory || product.category === selectedCategory;
        const brandMatch = !selectedBrand || product.brand === selectedBrand;
        return nameMatch && categoryMatch && brandMatch;
    });
}

function displayProductsPage(page) {
    if (isLoading) return;
    isLoading = true;
    
    currentPage = page;
    const filteredProducts = getFilteredProducts();
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    displayProducts(productsToShow);
    updatePagination(filteredProducts.length);
    isLoading = false;
}

function displayProducts(productsToShow) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    if (productsToShow.length === 0) {
        productList.innerHTML = `
            <div class="col-12 text-center">
                <p>No se encontraron productos.</p>
            </div>`;
        return;
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 mb-4';

        const imageUrl = product.image?.startsWith('http') ? product.image : `/${product.image}`;

        productCard.innerHTML = `
            <div class="product-card">
                <img 
                    data-src="${imageUrl}" 
                    alt="${product.name}" 
                    class="product-image lazy"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    onerror="this.src='/img/no-image.png'"
                >
                <h4 class="product-name">${product.name || 'Sin nombre'}</h4>
                <p class="product-brand">Marca: ${product.brand || 'No especificada'}</p>
                <p class="product-code">Código: ${product.code || 'No especificado'}</p>
                <p class="product-category">Categoría: ${product.category || 'Sin categoría'}</p>
                <p class="product-availability ${product.availability ? '' : 'out-of-stock'}">
                    ${product.availability ? 'Disponible' : 'No disponible'}
                </p>
            </div>
        `;
        productList.appendChild(productCard);
    });

    initLazyLoading();
}

function updatePagination(totalProducts) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    let paginationHTML = '';

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    // Botón anterior
    paginationHTML += `
        <button 
            onclick="displayProductsPage(${currentPage - 1})" 
            class="pagination-btn btn"
            ${currentPage === 1 ? 'disabled' : ''}
        >Anterior</button>
    `;

    // Páginas
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
            paginationHTML += `
                <button 
                    onclick="displayProductsPage(${i})"
                    class="pagination-btn btn ${i === currentPage ? 'active' : ''}"
                >${i}</button>
            `;
        } else if (
            i === currentPage - 3 || 
            i === currentPage + 3
        ) {
            paginationHTML += '<span class="mx-1">...</span>';
        }
    }

    // Botón siguiente
    paginationHTML += `
        <button 
            onclick="displayProductsPage(${currentPage + 1})" 
            class="pagination-btn btn"
            ${currentPage === totalPages ? 'disabled' : ''}
        >Siguiente</button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

function applyFilters() {
    displayProductsPage(1);
}

// Event Listeners
document.getElementById('searchInput')?.addEventListener('input', applyFilters);
document.getElementById('categoryFilter')?.addEventListener('change', applyFilters);
document.getElementById('brandFilter')?.addEventListener('change', applyFilters);

// Iniciar la carga de productos
document.addEventListener('DOMContentLoaded', loadProducts);