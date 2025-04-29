// Initialize cart if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
  const countElements = document.querySelectorAll('#cart-count');
  countElements.forEach(el => {
    el.textContent = cart.length;
  });
}

// Add item to cart
function addToCart(type, name, price, image) {
  // Check if item already exists in cart
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    // Item exists, increase quantity
    existingItem.quantity += 1;
  } else {
    // Add new item to cart
    cart.push({
      type,
      name,
      price,
      image,
      quantity: 1
    });
  }
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update UI
  updateCartCount();
  
  // If on builder page, update the build summary
  if (window.location.pathname.includes('builder.html')) {
    updateBuildSummary();
  }
  
  // Show confirmation
  alert(`${name} has been added to your build!`);
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCart();
}

// Update build summary on builder page
function updateBuildSummary() {
  const buildItemsEl = document.getElementById('build-items');
  const totalPriceEl = document.getElementById('build-total-price');
  
  if (cart.length === 0) {
    buildItemsEl.innerHTML = '<p class="empty-message">Select components to begin your build</p>';
    totalPriceEl.textContent = '$0';
    return;
  }
  
  let html = '';
  let total = 0;
  
  cart.forEach(item => {
    total += item.price * item.quantity;
    html += `
      <div class="build-item">
        <span>${item.name}</span>
        <span>$${item.price * item.quantity}</span>
      </div>
    `;
  });
  
  buildItemsEl.innerHTML = html;
  totalPriceEl.textContent = `$${total}`;
}

// Load cart on cart page
function loadCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-message">Your cart is empty</p>';
    subtotalEl.textContent = '$0';
    totalEl.textContent = '$0';
    return;
  }
  
  let html = '';
  let subtotal = 0;
  
  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${item.type}</p>
        </div>
        <div class="cart-item-price">$${item.price * item.quantity}</div>
        <button class="remove-item" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });
  
  cartItemsEl.innerHTML = html;
  subtotalEl.textContent = `$${subtotal}`;
  totalEl.textContent = `$${subtotal}`; // No tax/shipping in this example
}

// Handle checkout form submission
function handleCheckout(e) {
  e.preventDefault();
  
  // In a real app, you would process the payment here
  alert('Order placed successfully! Thank you for your purchase.');
  
  // Clear the cart
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  // Redirect to home page
  window.location.href = 'index.html';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Update cart count on all pages
  updateCartCount();
  
  // Load specific page content
  if (window.location.pathname.includes('builder.html')) {
    updateBuildSummary();
  } else if (window.location.pathname.includes('cart.html')) {
    loadCart();
    
    // Add event listener for checkout form
    const checkoutForm = document.getElementById('shipping-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', handleCheckout);
    }
  }
});