// Menu Category Buttons
if (document.getElementById("teaBtn")) {

    let categories = {
        tea: document.querySelector(".tea"),
        coffee: document.querySelector(".coffee"),
        burger: document.querySelector(".burger"),
        sandwich: document.querySelector(".sandwich"),
        noodles: document.querySelector(".noodles"),
        pizza: document.querySelector(".pizza"),
        soft: document.querySelector(".soft")
    };

    let buttons = {
        tea: document.getElementById("teaBtn"),
        coffee: document.getElementById("coffeeBtn"),
        burger: document.getElementById("burgerBtn"),
        sandwich: document.getElementById("sandwichBtn"),
        noodles: document.getElementById("noodlesBtn"),
        pizza: document.getElementById("pizzaBtn"),
        soft: document.getElementById("softBtn")
    };

    // Hide all categories initially
    Object.values(categories).forEach(function (category) {
        category.style.display = "none";
    });

    // Open only selected category
    Object.keys(buttons).forEach(function (key) {
        buttons[key].addEventListener("click", function () {

            Object.keys(categories).forEach(function (name) {
                categories[name].style.display = "none";
            });

            categories[key].style.display = "grid";
        });
    });
}


// Contact Form
function sendMessage(event) {
    event.preventDefault();
    alert("Message Sent Successfully!");
}





 // Add to Cart
document.querySelectorAll(".menuitem").forEach(function (item) {

    let name = item.querySelector("h3").textContent.trim();
    let priceText = item.querySelector("p").textContent;
    let price = Number(priceText.replace(/[^\d]/g, ""));
    let image = item.querySelector("img").getAttribute("src");

    let button = item.querySelector(".addToCartBtn");

    // Create button if it does not exist
    if (!button) {
        button = document.createElement("button");
        button.className = "addToCartBtn";
        button.textContent = "Add to Cart";
        item.appendChild(button);
    }

    // Save item details in button
    button.dataset.name = name;
    button.dataset.price = price;
    button.dataset.image = image;

    // Add item to cart when clicked
    button.addEventListener("click", function () {

        let cart = JSON.parse(localStorage.getItem("sagarCart")) || [];

        let existingItem = cart.find(function (cartItem) {
            return cartItem.name === name;
        });

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        localStorage.setItem("sagarCart", JSON.stringify(cart));

        document.querySelectorAll(".cartCount").forEach(function (count) {
            count.textContent = cart.reduce(function (total, item) {
                return total + item.quantity;
            }, 0);
        });

        alert(name + " added to cart!");
    });
});

 // ===== SAGAR CAFE CART PAGE =====

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("sagarCart")) || [];
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");

    // Cart page par hi code chalega
    if (!cartItems || !totalPrice) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>🛒 Oops! Your cart is hungry!</h2>
                <p>Abhi tak kuch order nahi kiya 😋</p>
                <p>Chalo, kuch tasty khate hain!</p>
                <a href="sagarmenu.html">🍕 Explore Our Menu</a>
            </div>
        `;
        totalPrice.textContent = "Total: ₹0";
        return;
    }

    cart.forEach(function (item, index) {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-details">
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <h4>Subtotal: ₹${subtotal}</h4>
                    <button onclick="changeQuantity(${index}, -1)">➖</button>
                    <button onclick="changeQuantity(${index}, 1)">➕</button>
                    <button onclick="removeItem(${index})">🗑️ Remove</button>
                </div>
            </div>
        `;
    });

    totalPrice.textContent = "Total: ₹" + total;
}

function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("sagarCart")) || [];

    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("sagarCart", JSON.stringify(cart));
    displayCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("sagarCart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("sagarCart", JSON.stringify(cart));
    displayCart();
}

function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("sagarCart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty! 😅 Pehle kuch tasty add karo.");
        return;
    }

    alert("🎉 Thank you for choosing Sagar Cafe! Your demo order has been placed.");

    localStorage.removeItem("sagarCart");
    displayCart();
}

displayCart();
