function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price);
        const li = document.createElement("li");
        li.innerHTML = `
      ${item.name} — ${item.price} руб.
      <button onclick="removeItem(${index})">Удалить</button>
    `;
        cartList.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    alert("Спасибо за заказ!");
    localStorage.removeItem("cart");
    loadCart();
}

document.addEventListener("DOMContentLoaded", loadCart);
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            name: btn.dataset.name,
            price: btn.dataset.price
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Товар добавлен в корзину!');
    });
});
