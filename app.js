
let cart = [];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const themeBtn = document.getElementById("themeBtn");
const checkoutBtn = document.getElementById("checkoutBtn");


function displayProducts(list) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;

    cart.push(product);

    updateCart();

}


function updateCart() {

    cartCount.textContent = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartTotal.textContent = "0";

        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        const item =
            document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <span>
                ${product.icon}
                ${product.name}
            </span>

            <span>
                ₹${product.price.toLocaleString("en-IN")}

                <button
                    onclick="removeFromCart(${index})"
                >
                    ✕
                </button>
            </span>

        `;

        cartItems.appendChild(item);

    });

    cartTotal.textContent =
        total.toLocaleString("en-IN");

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


searchInput.addEventListener(
    "input",
    function () {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        const filtered =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(query)
            );

        displayProducts(filtered);

    }
);


cartBtn.addEventListener(
    "click",
    function () {

        cartModal.classList.remove("hidden");

    }
);


closeCart.addEventListener(
    "click",
    function () {

        cartModal.classList.add("hidden");

    }
);


cartModal.addEventListener(
    "click",
    function (event) {

        if (event.target === cartModal) {

            cartModal.classList.add("hidden");

        }

    }
);


themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle("dark");

        themeBtn.textContent =
            document.body.classList.contains("dark")
                ? "☀️"
                : "🌙";

    }
);


checkoutBtn.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }

        alert(
            "Order placed successfully! 🎉"
        );

        cart = [];

        updateCart();

        cartModal.classList.add("hidden");

    }
);


displayProducts(products);
