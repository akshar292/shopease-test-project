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
Wrong property name: productId instead of id
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
    ================================================
    BUG #2
    Product is NOT pushed into cart
    ================================================
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
Wrong item is removed
====================================================
*/

function removeFromCart(index) {

    if (cart.length > 0) {

        /*
        BUG:
        Always removes first item.
        */

        cart.splice(0, 1);
    }

    updateCart();
}


/*
====================================================
BUG #4
Search uses wrong property
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

                    /*
                    BUG:
                    product.title does not exist.
                    */

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
Dark mode uses wrong class name
====================================================
*/

themeBtn.addEventListener(
    "click",
    function () {

        /*
        BUG:
        CSS expects "dark".
        */

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
        ============================================
        BUG #6
        Cart is not cleared after checkout
        ============================================
        */

        alert(
            "Order placed successfully! 🎉"
        );

        /*
        BUG:
        Missing:

        cart = [];
        updateCart();
        */

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