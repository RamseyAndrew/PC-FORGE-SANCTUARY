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

  // Show toast notification
  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000); // Hide the toast after 3 seconds
  }

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
