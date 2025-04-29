

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

function renderBuildItems() {
  const buildItems = document.getElementById('build-items');
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
    document.getElementById('build-total-price').textContent = `$${total}`;
  }
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <img src="images/${item.image}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
        <button onclick="removeFromCart(${index})" class="remove-button">Remove</button>
      `;
      cartItems.appendChild(div);
      total += item.price;
    });
    document.getElementById('subtotal').textContent = `$${total}`;
    document.getElementById('total').textContent = `$${total}`;
  }
}

function addToCart(category, name, price, image) {
  const item = { category, name, price, image };
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
  if (window.location.href.includes('cart.html')) {
    renderCart();
  } else if (window.location.href.includes('builder.html')) {
    renderBuildItems();
  }
  updateCartCount();
});
