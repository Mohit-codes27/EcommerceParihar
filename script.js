const products = [
    { id: 1, name: 'Protecto', price: 6.00, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat.', image1: 'product2.jpg', image2: 'product.jpg', image3: 'product.jpg'  },
    { id: 2, name: 'Protecto (With Fragrance)', price: 8.00, description: 'A durable, nonporous disposable toilet seat cover infused with natural essential oils for a refreshing fragrance. It provides a reliable germ-free barrier, staying intact even on wet surfaces. Perfect for travelers, office-goers, and anyone seeking enhanced hygiene in public restrooms.', image1: 'product2.jpg', image2: 'product.jpg', image3: 'product.jpg'  },
    { id: 3, name: 'Protecto (With Cushioning)', price: 10.00, description: 'A soft, padded disposable toilet seat cover designed for ultimate comfort and hygiene. Made from nonporous, water-resistant material, it ensures reliable germ protection even on wet surfaces. Ideal for adding a touch of luxury to your public restroom experience.', image1: 'product2.jpg', image2: 'product.jpg', image3: 'product.jpg'  },
    { id: 4, name: 'Protecto Lux', price: 15.00, description: 'These disposable toilet seat covers, made from durable, nonporous, and water-resistant materials, provide a reliable, germ-free barrier that stays intact even on wet surfaces, offering ultimate hygiene and comfort with padding and a refreshing essential oil fragrance—perfect for travelers, office-goers, and anyone seeking a luxurious and hygienic public restroom experience.', image1: 'product2.jpg', image2: 'product.jpg', image3: 'product.jpg'  },
    { id: 5, name: 'Protecto (Pack of 10)', price: 60.00, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat.', image1: 'product2.jpg', image2: 'product.jpg', image3: 'product.jpg'  },
    { id: 6, name: 'Protecto (Pack of 20)', price: 120.00, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat.', image1: 'product2.jpg', image2: 'product.jpg', image3: 'product.jpg'  },
    { id: 7, name: 'Protecto (Pack of 30)', price: 180.00, description: 'These disposable toilet seat covers are designed to enhance hygiene and comfort in public restrooms. Made from a nonporous, undissolvable material, each cover provides a secure, germ-free barrier that fits any toilet seat.', image1: 'product2.jpg', image2: 'product.jpg', image3: 'product.jpg'  }
];

let cart = [];

function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="carousel">
        <div class="carousel-images">
            <img src=${product.image1} alt=${product.name}>
            <img src=${product.image2} alt=${product.name}>
        </div>
        <button class="prev-btn">❮</button>
        <button class="next-btn">❯</button>
    </div>
            <div class="product-details">
                <h3>${product.name}</h3>
                <div class="desc box">${product.description}</div>
                <p class="price">₹${product.price.toFixed(2)}</p>
                <button class="cart-button" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
        renderQuantityControl(productId);
    }

    updateCart();
}

function renderQuantityControl(productId) {
    const productCard = document.querySelector(`.product-card button[onclick="addToCart(${productId})"]`);
    if (productCard) {
        productCard.outerHTML = `
            <div id="quantity-control-${productId}" class="quantity-control">
                <button class="minus-btn" onclick="DecreaseQuantity(${productId})">-</button>
                <span id="quantity-${productId}">1</span>
                <button class="plus-btn" onclick="IncreaseQuantity(${productId})">+</button>
            </div>
        `;
    }
}

function restoreAddToCartButton(productId) {
    const quantityControl = document.getElementById(`quantity-control-${productId}`);
    if (quantityControl) {
        quantityControl.outerHTML = `<button class="cart-button" onclick="addToCart(${productId})">Add to Cart</button>`;
    }
}

function IncreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        document.getElementById(`quantity-${productId}`).innerText = cartItem.quantity;
    }
    updateCart();
}

function DecreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            document.getElementById(`quantity-${productId}`).innerText = cartItem.quantity;
        } else {
            removeFromCart(productId);
            restoreAddToCartButton(productId);
        }
    }
    updateCart();
}


function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="cart-card">
                <img src="${item.image1}" alt="${item.name}">
                <span class="card-context">${item.name} - ₹<span class="cart-item-price">${item.price.toFixed(2)}</span> x <span class="cart-item-quantity">${item.quantity}</span></span>
                <div class="quantity-controls">
                    <button class="quantity-button" onclick="decreaseQuantity(${item.id})"><i class="fa-solid fa-minus"></i></button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="quantity-button" onclick="increaseQuantity(${item.id})"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.innerText = cart.length;
    updateCartTotal();
}

function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            document.getElementById(`quantity-${productId}`).innerText = cartItem.quantity;
        } else {
            removeFromCart(productId);
            restoreAddToCartButton(productId);
        }
    }
    updateCart();
}

function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        document.getElementById(`quantity-${productId}`).innerText = cartItem.quantity;
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-section').classList.toggle('show');
}

renderProducts();


function updateCartTotal() {
    let cartItems = document.querySelectorAll('.cart-item');
    let productsPrice = 0;

    cartItems.forEach(item => {
        const priceElement = item.querySelector('.cart-item-price');
        const quantityElement = item.querySelector('.cart-item-quantity');
        const price = parseFloat(priceElement.innerText);
        const quantity = parseInt(quantityElement.innerText);

        productsPrice += price * quantity;
    });

    let productsPriceInINR = productsPrice;
    let gst = productsPriceInINR * 0.12;
    let finalPrice = productsPriceInINR + gst;

    document.getElementById('products-price').innerText = productsPriceInINR.toFixed(2);
    document.getElementById('gst').innerText = gst.toFixed(2);
    document.getElementById('final-price').innerText = finalPrice.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll(".product-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Add the class for scroll animation
                observer.unobserve(entry.target); // Stop observing once done
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the card is visible

    productCards.forEach(card => observer.observe(card));
});

document.querySelectorAll('.product-card').forEach(card => {
    const images = card.querySelector('.carousel-images');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');
    const imageCount = images.children.length;

    let currentIndex = 0;

    // Set the width of the carousel images container dynamically based on number of images
    images.style.width = `${imageCount * 100}%`;

    const updateCarousel = () => {
        const width = card.querySelector('.carousel').offsetWidth;
        // Move the carousel to the appropriate image
        images.style.transform = `translateX(-${currentIndex * width}px)`;
    };

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : imageCount - 1; // Loop to the last image if we're on the first one
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageCount; // Loop back to the first image if we're on the last one
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel); // Update carousel on window resize
});



