// Initialize cart
let cart = [];

// Load cart from localStorage if exists
if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

// Update cart count in header
function updateCartCount() {
    document.querySelectorAll('#cart-count').forEach(span => {
        span.textContent = cart.length;
    });
}
updateCartCount();

// Add product to cart
function addToCart(name, price, image) {
    cart.push({name, price, image});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(name + " added to cart!");
}

// Display cart items in cart.html
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    if(!cartItemsDiv) return;

    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItemsDiv.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="100">
            <p>${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>
        </div>
        `;
    });

    document.getElementById('total').textContent = total;
}
displayCart();

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Buy Now simulation
function buyNow() {
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let totalAmount = cart.reduce((a, b) => a + b.price, 0);
    alert("Thank you for your purchase! Total: ₹" + totalAmount);

    // Clear cart
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
    updateCartCount();
}