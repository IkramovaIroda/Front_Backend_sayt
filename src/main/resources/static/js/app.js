let currentCategory = 'all';
let currentBrand = 'all';
let currentPrice = 'all';

function applyFilters() {
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const productCategory = product.dataset.category || '';
    const productBrand = product.dataset.brand || '';
    const productPrice = parseInt(product.dataset.price);

    const categoryMatch = currentCategory === 'all' || productCategory === currentCategory;
    const brandMatch = currentBrand === 'all' || productBrand === currentBrand;
    const priceMatch =
        currentPrice === 'all' ||
        (currentPrice === 'low' && productPrice <= 100000) ||
        (currentPrice === 'medium' && productPrice > 100000 && productPrice <= 250000) ||
        (currentPrice === 'high' && productPrice > 250000);

    product.style.display = (categoryMatch && brandMatch && priceMatch) ? 'block' : 'none';
  });
}

function filterProducts(category) {
  currentCategory = category;
  applyFilters();
}

function filterByBrand(brand) {
  currentBrand = brand;
  applyFilters();
}

function filterByPrice(price) {
  currentPrice = price;
  applyFilters();
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
          productCard.dataset.category = product.category;
          productCard.dataset.brand = product.brand;
          productCard.dataset.price = product.price;

          productCard.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <button class="details-btn"
                  data-name="${product.name}"
                  data-description="${product.description}"
                  data-price="${product.price} руб."
                  data-image="${product.imageUrl}">
            Подробнее
          </button>
        `;

          container.appendChild(productCard);
        });

        // Назначаем обработчики кнопкам
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

        applyFilters(); // Применить фильтры к загруженным товарам
      })
      .catch(error => {
        console.error('Ошибка при загрузке товаров:', error);
      });

  // Закрытие модального окна при клике на крестик или фон
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('product-modal').addEventListener('click', (event) => {
    if (event.target.id === 'product-modal') {
      closeModal();
    }
  });
});
