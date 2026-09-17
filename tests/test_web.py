from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]

HTML_FILE = PROJECT_ROOT / "index.html"
CSS_FILE = PROJECT_ROOT / "style.css"
JS_FILE = PROJECT_ROOT / "app.js"
PRODUCTS_FILE = PROJECT_ROOT / "products.js"


def test_index_html_exists():

    assert HTML_FILE.exists(), (
        "index.html not found"
    )


def test_css_exists():

    assert CSS_FILE.exists(), (
        "style.css not found"
    )


def test_app_js_exists():

    assert JS_FILE.exists(), (
        "app.js not found"
    )


def test_products_js_exists():

    assert PRODUCTS_FILE.exists(), (
        "products.js not found"
    )


def test_html_has_shop_content():

    html = HTML_FILE.read_text(
        encoding="utf-8"
    )

    assert "<html" in html.lower()

    assert "<body" in html.lower()

    assert "ShopEase" in html


def test_css_has_styles():

    css = CSS_FILE.read_text(
        encoding="utf-8"
    )

    assert len(css.strip()) > 0

    assert "body" in css


def test_add_cart_button_color():

    css = CSS_FILE.read_text(
        encoding="utf-8"
    )

    assert "background: #315dcc;" in css, (
        "TARGET_FILE: style.css - "
        "The .add-cart button background "
        "must be #315dcc."
    )


def test_checkout_button_color():

    css = CSS_FILE.read_text(
        encoding="utf-8"
    )

    assert "#checkoutBtn" in css

    assert "background: #315dcc;" in css, (
        "TARGET_FILE: style.css - "
        "The #checkoutBtn background "
        "must be #315dcc."
    )


def test_cart_add_function_exists():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert "function addToCart" in js, (
        "TARGET_FILE: app.js - "
        "addToCart function is missing."
    )


def test_cart_remove_function_exists():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert "function removeFromCart" in js, (
        "TARGET_FILE: app.js - "
        "removeFromCart function is missing."
    )


def test_search_functionality_exists():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert "searchInput.addEventListener" in js, (
        "TARGET_FILE: app.js - "
        "Search input event listener "
        "is missing."
    )


def test_theme_toggle_exists():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert 'classList.toggle("dark")' in js, (
        "TARGET_FILE: app.js - "
        "Dark mode toggle is missing."
    )


def test_add_to_cart_uses_product_id():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert "item.id === productId" in js, (
        "TARGET_FILE: app.js - "
        "BUG: addToCart must find the "
        "product using item.id."
    )


def test_add_to_cart_pushes_product():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert "cart.push(product)" in js, (
        "TARGET_FILE: app.js - "
        "BUG: addToCart must add the "
        "selected product to cart."
    )


def test_remove_from_cart_uses_index():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert "cart.splice(index, 1)" in js, (
        "TARGET_FILE: app.js - "
        "BUG: removeFromCart must remove "
        "the selected item using its index."
    )


def test_search_uses_product_name():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert "product.name" in js, (
        "TARGET_FILE: app.js - "
        "BUG: search must use product.name."
    )


def test_dark_mode_uses_correct_class():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert 'classList.toggle("dark")' in js, (
        "TARGET_FILE: app.js - "
        "BUG: dark mode must toggle "
        "the dark class."
    )


def test_checkout_clears_cart():

    js = JS_FILE.read_text(
        encoding="utf-8"
    )

    assert "cart = []" in js, (
        "TARGET_FILE: app.js - "
        "BUG: checkout must clear the cart."
    )