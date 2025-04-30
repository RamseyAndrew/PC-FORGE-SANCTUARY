// initialize cart from localStorage 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// save the current cart items 
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//this updates the cart count 
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// shows items in the build section (builder.html)
function renderBuildItems() {
  const buildItems = document.getElementById('build-items');
  if (!buildItems) return;

  buildItems.innerHTML = ''; 
  let total = 0;

  if (cart.length === 0) {
    // displays empty message if no items the "No items in your build yet"
    buildItems.innerHTML = '<p class="empty-message">No items in your build yet.</p>';
  } else {
    // goes through each cart item and displays it
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

    // displays total build price
    const totalEl = document.getElementById('build-total-price');
    if (totalEl) totalEl.textContent = `$${total}`;
  }
}

// shows items in the cart (cart.html)
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const checkoutBtn = document.querySelector('.checkout-button');

  if (!cartItems) return;

  cartItems.innerHTML = ''; // Clears existing cart content
  let total = 0;

  if (cart.length === 0) {
    // shows empty cart message"Your cart is empty"
    cartItems.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
    if (subtotalEl) subtotalEl.textContent = `$0`;
    if (totalEl) totalEl.textContent = `$0`;
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    // goes through cart items and displays each one
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

    // Update subtotal and total
    if (subtotalEl) subtotalEl.textContent = `$${total}`;
    if (totalEl) totalEl.textContent = `$${total}`;
    if (checkoutBtn) checkoutBtn.disabled = false;
  }
}

// adds a new item to the cart
function addToCart(category, name, price, image) {
  // Prevents repetition
  const exists = cart.find(item => item.name === name && item.category === category);
  if (exists) {
    alert('Item is already in your cart.');
    return;
  }

  const item = { category, name, price: Number(price), image };
  cart.push(item);
  saveCart();
  updateCartCount();

  // If on builder.html, update that view
  if (window.location.href.includes('builder.html')) {
    renderBuildItems();
  }
}

// Remove an item from the cart using its index
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateCartCount();
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // If on the cart page
  if (window.location.href.includes('cart.html')) {
    renderCart();

    // Handle shipping form submission
    const form = document.getElementById('shipping-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;

        // Check that all fields are filled
        if (!name || !address || !email || !date) {
          alert('Please fill out all fields.');
          return;
        }

        // Confirm order
        alert(`Thank you, ${name}! Your order will be shipped on ${date}.`);

        // Reset form and clear cart
        form.reset();
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
      });
    }

  // If on the builder page
  } else if (window.location.href.includes('builder.html')) {
    renderBuildItems();
  }
});
