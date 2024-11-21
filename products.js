// Array to store product data
const products = [
    {
        image: 'images/pink_cross.jpg',
        name: 'PRJCT X CROSS HOODIE PINK',
        price: '$̶7̶5̶.0̶0̶  $65.00',
        link: 'pink.html' // Link to the individual product page
    },
    {
        image: 'images/black_cross.jpg',
        name: 'COMING SOON...',
        price: '$75.00',
        link: 'black.html'
    },
    {
        image: 'images/pink_shorts.jpg',
        name: 'PRJCT X CAMO SHORTS PINK',
        price: '$20.00',
        link: 'pinkshorts.html'
    },
    {
        image: 'images/product4.jpg',
        name: 'Product 4',
        price: '$35.00',
        link: 'product4.html'
    },
    {
        image: 'images/product5.jpg',
        name: 'Product 5',
        price: '$40.00',
        link: 'product5.html'
    },
    {
        image: 'images/product6.jpg',
        name: 'Product 6',
        price: '$50.00',
        link: 'product6.html'
    }
];

// Function to display products dynamically
function displayProducts(type) {
    let productsToDisplay;

    // Determine which products to display
    if (type === "featured") {
        // Display only the first two products for the featured section
        productsToDisplay = products.slice(0, 2);
    } else if (type === "all") {
        // Display all products for the all-products section
        productsToDisplay = products;
    }

    const container = type === "featured" 
        ? document.getElementById('featured-product-grid') 
        : document.getElementById('all-product-grid');
    
    container.innerHTML = ""; // Clear the container before adding products

    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h4><a href="${product.link}">${product.name}</a></h4> <!-- Link product name to its page -->
            <p>${product.price}</p>
            
        `;

        container.appendChild(productDiv);
    });
}

// Initialize the display of all products on the all-products page
window.onload = function() {
    displayProducts("all"); // Call the function to display all products
};
