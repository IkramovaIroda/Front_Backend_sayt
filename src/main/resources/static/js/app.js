function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
        .map(cb => cb.value.trim().toLowerCase());
}

function applyFilters() {
    const selectedCategories = getCheckedValues('category');
    const selectedPrices = getCheckedValues('price');
    const selectedBrands = getCheckedValues('brand');

    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const category = card.dataset.category?.toLowerCase();
        const brand = card.dataset.brand?.toLowerCase();
        const price = parseInt(card.dataset.price);

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);

        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);

        const matchesPrice = selectedPrices.length === 0 || selectedPrices.some(p => {
            if (p === 'low') return price <= 100000;
            if (p === 'mid') return price > 100000 && price <= 200000;
            if (p === 'high') return price > 200000;
            return false;
        });

        card.style.display = (matchesCategory && matchesBrand && matchesPrice) ? 'block' : 'none';
    });
}

function openModal(product) {
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = 'Цена: ' + product.price;
    document.getElementById('modal-image').src = product.image;
    document.getElementById('product-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:1312/api/products')
        .then(response => response.json())
        .then(products => {
            const container = document.querySelector('.products');
            container.innerHTML = '';

            products.forEach(product => {
                const productCard = document.createElement('article');
                productCard.className = 'product-card';
                productCard.dataset.category = product.category?.toLowerCase();
                productCard.dataset.brand = product.brand?.toLowerCase();
                productCard.dataset.price = product.price;

                productCard.innerHTML = `
            <img src="${product.imageUrl || product.image}" alt="${product.name}" />
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="price">${product.price} руб.</p>
            <button class="details-btn"
                    data-name="${product.name}"
                    data-description="${product.description}"
                    data-price="${product.price} руб."
                    data-image="${product.imageUrl || product.image}">
              Подробнее
            </button>
            <button class="add-to-cart-btn"
                    data-name="${product.name}"
                    data-price="${product.price}">
              В корзину
            </button>
          `;

                container.appendChild(productCard);
            });

            document.querySelectorAll('.details-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const product = {
                        name: btn.dataset.name,
                        description: btn.dataset.description,
                        price: btn.dataset.price,
                        image: btn.dataset.image
                    };
                    openModal(product);
                });
            });

            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const name = btn.dataset.name;
                    const price = btn.dataset.price;
                    alert(`Товар "${name}" за ${price} добавлен в корзину!`);
                });
            });

            applyFilters();
        })
        .catch(error => {
            console.error('Ошибка при загрузке товаров:', error);
        });

    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('product-modal').addEventListener('click', (event) => {
        if (event.target.id === 'product-modal') {
            closeModal();
        }
    });

    document.querySelectorAll('.filters input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    document.querySelectorAll('.filter-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const group = button.parentElement;
            group.classList.toggle('open');
        });
    });
});
