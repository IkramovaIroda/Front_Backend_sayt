let currentCategory = 'all';
let currentBrand = 'all';
let currentPrice = 'all';

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
      .map(cb => cb.value.trim());
}

function applyFilters() {
  const selectedCategories = getCheckedValues('category');
  const selectedPrices = getCheckedValues('price');
  const selectedBrands = getCheckedValues('brand'); // если есть фильтр по брендам

  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const category = card.dataset.category?.trim().toLowerCase();
    const price = parseInt(card.dataset.price);
    const brand = card.dataset.brand?.trim().toLowerCase();

    const matchesCategory =
        (selectedCategories.length === 0 || selectedCategories.includes(category)) &&
        (currentCategory === 'all' || category === currentCategory);

    const matchesPrice =
        (selectedPrices.length === 0 || selectedPrices.some(p => {
          if (p === 'low') return price <= 100000;
          if (p === 'mid') return price > 100000 && price <= 200000;
          if (p === 'high') return price > 200000;
          return false;
        })) &&
        (currentPrice === 'all' ||
            (currentPrice === 'low' && price <= 100000) ||
            (currentPrice === 'medium' && price > 100000 && price <= 250000) ||
            (currentPrice === 'high' && price > 250000));

    const matchesBrand =
        (selectedBrands.length === 0 || selectedBrands.includes(brand)) &&
        (currentBrand === 'all' || brand === currentBrand);

    card.style.display = (matchesCategory && matchesPrice && matchesBrand) ? 'block' : 'none';
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
          productCard.dataset.category = product.category?.toLowerCase();
          productCard.dataset.brand = product.brand?.toLowerCase();
          productCard.dataset.price = product.price;

          productCard.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p class="price">${product.price} руб.</p>
          <button class="details-btn"
                  data-name="${product.name}"
                  data-description="${product.description}"
                  data-price="${product.price} руб."
                  data-image="${product.imageUrl}">
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

        // Обработчики кнопок "Подробнее"
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

        // Обработчики кнопок "В корзину"
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            const price = btn.dataset.price;
            alert(`Товар "${name}" за ${price} добавлен в корзину!`);
            // здесь можно реализовать добавление в корзину
          });
        });

        applyFilters(); // применить фильтры к загруженным товарам
      })
      .catch(error => {
        console.error('Ошибка при загрузке товаров:', error);
      });

  // Закрытие модального окна
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('product-modal').addEventListener('click', (event) => {
    if (event.target.id === 'product-modal') {
      closeModal();
    }
  });

  // Обработчики фильтров по чекбоксам
  document.querySelectorAll('.filters input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', applyFilters);
  });

  // Кнопки-свёртки фильтров
  document.querySelectorAll('.filter-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const group = button.parentElement;
      group.classList.toggle('open');
    });
  });
});
