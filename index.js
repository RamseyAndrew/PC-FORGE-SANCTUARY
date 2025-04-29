// index.js

// Global cart array loaded from localStorage or initialized empty
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Utility: Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Utility: Update cart count on all pages
function updateCartCount() {
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

// Add item to cart
function addToCart(category, name, price, image) {
  const item = { category, name, price, image };
  cart.push(item);
  saveCart();
  updateCartCount();
  alert(`${name} added to your build!`);
  renderBuildItems(); // update right-side build preview if on builder page
}

// Render current build preview on builder.html
function renderBuildItems() {
  const buildItemsContainer = document.getElementById('build-items');
  const emptyMessage = document.querySelector('.empty-message');
  const totalPrice = document.getElementById('build-total-price');

  if (!buildItemsContainer) return;

  buildItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    if (emptyMessage) emptyMessage.style.display = 'block';
    totalPrice.textContent = '$0';
    return;
  }

  if (emptyMessage) emptyMessage.style.display = 'none';

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'build-item';
    div.innerHTML = `
      <img src="images/${item.image}" alt="${item.name}">
      <div class="info">
        <h4>${item.name}</h4>
        <p class="price">$${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    buildItemsContainer.appendChild(div);
    total += item.price;
  });

  totalPrice.textContent = `$${total}`;
}

// Remove an item from cart
function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderBuildItems();
    renderCart(); // also update cart.html if on that page
  }
}

// Render cart items on cart.html
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const subtotalElem = document.getElementById('subtotal');
  const totalElem = document.getElementById('total');

  if (!cartItems || !subtotalElem || !totalElem) return;

  cartItems.innerHTML = '';
  let subtotal = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    subtotalElem.textContent = '$0';
    totalElem.textContent = '$0';
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="images/${item.image}" alt="${item.name}">
      <div class="info">
        <h4>${item.name}</h4>
        <p class="price">$${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItems.appendChild(div);
    subtotal += item.price;
  });

  subtotalElem.textContent = `$${subtotal}`;
  totalElem.textContent = `$${subtotal}`; // free shipping
}

// Handle form submission on cart.html
function setupFormHandler() {
  const form = document.getElementById('shipping-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Order placed! Thank you for shopping at PC FORGE SANCTUARY.');

    cart = [];
    saveCart();
    updateCartCount();

    // Clear UI
    renderBuildItems();
    renderCart();
    form.reset();
  });
}

// Initialize page-specific functions
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderBuildItems();
  renderCart();
  setupFormHandler();
});
