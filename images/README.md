Here’s a complete and well-structured `README.md` file for your **PC FORGE SANCTUARY** website project. This file explains what your project does, how it works, and how others can use or contribute to it.

---

## 🖥️ PC FORGE SANCTUARY – Custom PC Builder

**PC FORGE SANCTUARY** is a dynamic web-based application that allows users to build custom gaming PC setups by selecting individual components such as CPUs, GPUs, motherboards, cases, and coolers. The site provides an interactive experience for selecting components, viewing build totals, and simulating a checkout with shipping information.

---

### 📂 Project Structure

```plaintext
PC-FORGE-SANCTUARY/
│
├── index.html          # Home page with featured builds
├── builder.html        # Interactive PC builder page
├── cart.html           # Shopping cart & checkout page
├── styles.css          # Global CSS styles
├── index.js            # JavaScript logic (cart, rendering, form handling)
└── images/             # Component and UI images
```

---

### 💡 Features

- 🔍 **Component Search (WIP)**: Search for components by name (e.g., Intel, AMD).
- 🛠️ **Custom PC Builder**: Users can pick from a wide variety of components.
- 🛒 **Cart System**: Items are saved to localStorage and displayed in the cart.
- 📦 **Build Summary**: Real-time price updates based on selected items.
- ✅ **Checkout Form**: Collects shipping info and confirms order.
- 🎨 **Responsive UI**: Built with modern CSS and mobile-friendly layout.
- 💾 **Persistent Data**: Uses `localStorage` to retain cart contents between sessions.

---

### 🧰 Technologies Used

- **HTML5** / **CSS3**
- **JavaScript (ES6)**
- **Font Awesome** for icons
- **Google Fonts** (Orbitron & Roboto)

---

### 🚀 Getting Started

To run the project locally:

1. **Clone this repository**
   ```bash
   git clone https://github.com/RamseyAndrew/PC-FORGE-SANCTUARY
   ```

2. **Open `index.html` in your browser**
   ```bash
   cd pc-forge-sanctuary
   open index.html 
   ```



### 📝 How It Works

- `index.html`: Displays featured PC builds.
- `builder.html`: Users browse component categories and add items to a build list.
- `cart.html`: Displays added items, subtotal, and a form to complete the order.
- `index.js`: Handles all cart-related logic including:
  - Adding/removing items
  - Storing cart in localStorage
  - Rendering selected components and total prices
  - Submitting and resetting the checkout form



### 🛒 Component Categories

- ✅ CPUs (Intel/AMD)
- ✅ GPUs (NVIDIA/AMD)
- ✅ Motherboards
- ✅ CPU Coolers (Air & Liquid)
- ✅ PC Cases
- ✅ Prebuilt Featured Rigs


### 📄 License

This project is open source and free to use for educational or non-commercial purposes.

