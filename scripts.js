// Title screen fade-in/out
document.addEventListener("DOMContentLoaded", function () {
  const enterButton = document.getElementById("enterButton");
  const titleScreen = document.getElementById("titleScreen");
  const mainContent = document.getElementById("mainContent");

  enterButton.addEventListener("click", function () {
    titleScreen.classList.add("fade-out");
    setTimeout(function () {
      titleScreen.style.display = "none";
      mainContent.style.display = "block";
      mainContent.classList.add("fade-in");
    }, 500);
  });
});

// Product grid display
document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.getElementById('all-product-grid');
  if (productGrid) {
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');

      const productLink = document.createElement('a');
      productLink.href = product.link;
      productLink.textContent = product.name;
      productLink.classList.add('product-link');

      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.name;

      const productPrice = document.createElement('p');
      productPrice.textContent = product.price;

      productItem.appendChild(productLink);
      productItem.appendChild(productImage);
      productItem.appendChild(productPrice);

      productGrid.appendChild(productItem);
    });
  }
});

// Automatic slideshow
document.addEventListener("DOMContentLoaded", function () {
  const imagesPath = "images/HomePageimage/";
  const imageFiles = ["Julius1.jpg", "Julius3.jpg", "Julius4.jpg"];
  let currentIndex = 0;

  const firstImage = document.querySelector(".slideshow-image");
  if (firstImage) {
    firstImage.src = imagesPath + imageFiles[currentIndex];
    firstImage.classList.add("active");

    setInterval(() => {
      firstImage.classList.remove("active");
      currentIndex = (currentIndex + 1) % imageFiles.length;
      firstImage.src = imagesPath + imageFiles[currentIndex];
      firstImage.classList.add("active");
    }, 3000);
  }
});

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, size, quantity, price) {
  const item = { productId, size, quantity, price };
  cartItems.push(item);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartDisplay();
  showPopup();
}

function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-container");
  if (cartContainer) {
    cartContainer.innerHTML = "";
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p>Product: ${item.productId}</p>
        <p>Size: ${item.size}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${item.price}</p>
      `;
      cartContainer.appendChild(cartItem);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();

  const addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn) {
    const sizeSelect = document.getElementById("size");
    const quantityInput = document.getElementById("quantity");
    const priceElement = document.getElementById("price");
    const price = parseFloat(priceElement.textContent.replace('$', '').replace(',', ''));

    addToCartBtn.addEventListener("click", function () {
      const size = sizeSelect.value;
      const quantity = parseInt(quantityInput.value);
      addToCart("PRJCT X CROSS HOODIE PINK", size, quantity, price);
    });
  }
});

// Update cart table
function updateCartTable() {
  const cartTableBody = document.querySelector('#cart-table tbody');
  const totalPriceElement = document.getElementById('total-price');
  if (cartTableBody && totalPriceElement) {
    let totalPrice = 0;
    cartTableBody.innerHTML = '';

    cartItems.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.productId}</td>
        <td>${item.size}</td>
        <td><input type="number" value="${item.quantity}" min="1" class="cart-quantity" data-index="${index}" /></td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
        <td><button class="remove-item" data-index="${index}">Remove</button></td>
      `;
      cartTableBody.appendChild(row);
      totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartTable();

  const cartTable = document.querySelector('#cart-table');
  if (cartTable) {
    cartTable.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-item')) {
        const index = event.target.dataset.index;
        removeItem(index);
      }
    });

    cartTable.addEventListener('input', (event) => {
      if (event.target.classList.contains('cart-quantity')) {
        const index = event.target.dataset.index;
        const quantity = parseInt(event.target.value);
        updateQuantity(index, quantity);
      }
    });
  }
});

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartTable();
}

function updateQuantity(index, quantity) {
  if (quantity < 1) return;
  cartItems[index].quantity = quantity;
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartTable();
}

// Popup functionality
function showPopup() {
  const popup = document.getElementById("cart-popup");
  if (popup) {
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const closePopup = document.getElementById("close-popup");
  if (closePopup) {
    closePopup.addEventListener("click", function () {
      const popup = document.getElementById("cart-popup");
      popup.style.display = "none";
    });
  }
});
document.getElementById("toggle-nav").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent default link behavior
  document.getElementById("mobile-nav").classList.toggle("show"); // Toggle the menu visibility
});
