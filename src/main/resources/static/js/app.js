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

    if (categoryMatch && brandMatch && priceMatch) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
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

// Модальное окно
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

// Подключение событий на кнопки после загрузки
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/api/products')
    .then(response => response.json())
    .then(products => {
      const container = document.querySelector('.products');
      container.innerHTML = '';
      products.forEach(product => {
        const html = `
          <article class="product-card"
                   data-category="${product.category}"
                   data-brand="${product.brand}"
                   data-price="${product.price}">
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
          </article>`;
        container.insertAdjacentHTML('beforeend', html);
      });

      // Назначаем кнопкам обработчики открытия модального окна
      document.querySelectorAll('.details-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const product = {
            name: btn.dataset.name,
            description: btn.dataset.description,
            price: btn.dataset.price,
            image: btn.dataset.image,
          };
          openModal(product);
        });
      });

      applyFilters(); // Применить фильтры к загруженным данным
    });
});
