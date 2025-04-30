let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function renderBuildItems() {
  const buildItems = document.getElementById('build-items');
  if (!buildItems) return;

  buildItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    buildItems.innerHTML = '<p class="empty-message">No items in your build yet.</p>';
  } else {
    cart.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('build-item');
      div.innerHTML = `
        <img src="images/${item.image}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      `;
      buildItems.appendChild(div);
      total += item.price;
    });
    const totalEl = document.getElementById('build-total-price');
    if (totalEl) totalEl.textContent = `$${total}`;
  }
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const checkoutBtn = document.querySelector('.checkout-button');

  if (!cartItems) return;

  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
    if (subtotalEl) subtotalEl.textContent = `$0`;
    if (totalEl) totalEl.textContent = `$0`;
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `  
        <img src="images/${item.image}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
        <button onclick="removeFromCart(${index})" class="remove-button">Remove</button>
      `;
      cartItems.appendChild(div);
      total += Number(item.price);
    });
    if (subtotalEl) subtotalEl.textContent = `$${total}`;
    if (totalEl) totalEl.textContent = `$${total}`;
    if (checkoutBtn) checkoutBtn.disabled = false;
  }
}

function addToCart(category, name, price, image) {
  const exists = cart.find(item => item.name === name && item.category === category);
  if (exists) {
    alert('Item is already in your cart.');
    return;
  }

  const item = { category, name, price: Number(price), image };
  cart.push(item);
  saveCart();
  updateCartCount();

  if (window.location.href.includes('builder.html')) {
    renderBuildItems();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  if (window.location.href.includes('cart.html')) {
    renderCart();

    const form = document.getElementById('shipping-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;

        if (!name || !address || !email || !date) {
          alert('Please fill out all fields.');
          return;
        }

        alert(`Thank you, ${name}! Your order will be shipped on ${date}.`);

        form.reset();
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
      });
    }
  } else if (window.location.href.includes('builder.html')) {
    renderBuildItems();
  }
});
