let cart = [];

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const cartBtn =
    document.getElementById("cartBtn");

const cartModal =
    document.getElementById("cartModal");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const themeBtn =
    document.getElementById("themeBtn");

const checkoutBtn =
    document.getElementById("checkoutBtn");


function displayProducts(list) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

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


/*
====================================================
BUG #1
Wrong product property used.

Correct:
item.id === productId

Bug:
item.productId === productId
====================================================
*/

function addToCart(productId) {

    const product =
        products.find(
            item => item.productId === productId
        );

    if (!product) {

        console.log(
            "Product not found"
        );

        return;
    }


    /*
    =================================================
    BUG #2
    Product is not added to cart.
    =================================================
    */

    console.log(
        "Product selected:",
        product.name
    );

    updateCart();
}


/*
====================================================
UPDATE CART
====================================================
*/

function updateCart() {

    cartCount.textContent =
        cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartTotal.textContent =
            "0";

        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(
        (product, index) => {

            total += product.price;

            const item =
                document.createElement("div");

            item.className =
                "cart-item";

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
        }
    );

    cartTotal.textContent =
        total.toLocaleString("en-IN");
}


/*
====================================================
BUG #3
Wrong item gets removed.

Correct:
cart.splice(index, 1)

Bug:
cart.splice(0, 1)
====================================================
*/

function removeFromCart(index) {

    if (cart.length > 0) {

        cart.splice(0, 1);
    }

    updateCart();
}


/*
====================================================
BUG #4
Search uses wrong product property.

Correct:
product.name

Bug:
product.title
====================================================
*/

searchInput.addEventListener(
    "input",
    function () {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        const filtered =
            products.filter(
                product => {

                    return product.title
                        .toLowerCase()
                        .includes(query);
                }
            );

        displayProducts(filtered);
    }
);


/*
====================================================
CART OPEN
====================================================
*/

cartBtn.addEventListener(
    "click",
    function () {

        cartModal.classList.remove(
            "hidden"
        );
    }
);


/*
====================================================
CART CLOSE
====================================================
*/

closeCart.addEventListener(
    "click",
    function () {

        cartModal.classList.add(
            "hidden"
        );
    }
);


/*
====================================================
MODAL OUTSIDE CLICK
====================================================
*/

cartModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === cartModal
        ) {

            cartModal.classList.add(
                "hidden"
            );
        }
    }
);


/*
====================================================
BUG #5
Wrong dark mode class.

CSS expects:
dark

Bug uses:
dark-mode
====================================================
*/

themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );

        themeBtn.textContent =
            document.body.classList.contains(
                "dark-mode"
            )
                ? "☀️"
                : "🌙";
    }
);


/*
====================================================
CHECKOUT
====================================================
*/

checkoutBtn.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        /*
        =================================================
        BUG #6
        Cart is NOT cleared after checkout.
        =================================================
        */

        alert(
            "Order placed successfully! 🎉"
        );

        cartModal.classList.add(
            "hidden"
        );
    }
);


/*
====================================================
INITIAL RENDER
====================================================
*/

displayProducts(products);