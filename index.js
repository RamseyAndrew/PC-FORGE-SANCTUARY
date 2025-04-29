// Function to add an item to the cart
function addToCart(category, name, price, image) {
    const item = { category, name, price, image };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart.`);
}

// Sample product data for each category 
// CPU
addToCart('CPU', 'Intel Core i9-13900K', 589, 'images/Intel Core i9-13900K.jpeg');
addToCart('CPU', 'AMD Ryzen 9 7950X', 699, 'images/AMD Ryzen 9 7950X.jpeg');

// GPU
addToCart('GPU', 'NVIDIA GeForce RTX 4090', 1599, 'images/NVIDIA GeForce RTX 4090.jpeg');
addToCart('GPU', 'AMD Radeon RX 7900 XTX', 999, 'images/AMD Radeon RX 7900 XTX.jpeg');


// Function to load and display cart items on the checkout page
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');

    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
            <div>
                <h3>${item.name}</h3>
                <p>Category: ${item.category}</p>
                <p>Price: $${item.price}</p>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Optional: Display total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
        totalElement.textContent = `Total: $${total}`;
    }
}

// Call this function on the cart/checkout page
document.addEventListener('DOMContentLoaded', loadCartItems);
