from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]

HTML_FILE = PROJECT_ROOT / "index.html"
CSS_FILE = PROJECT_ROOT / "style.css"
JS_FILE = PROJECT_ROOT / "app.js"
PRODUCTS_FILE = PROJECT_ROOT / "products.js"


def test_index_html_exists():
    assert HTML_FILE.exists(), "index.html not found"


def test_css_exists():
    assert CSS_FILE.exists(), "style.css not found"


def test_app_js_exists():
    assert JS_FILE.exists(), "app.js not found"


def test_products_js_exists():
    assert PRODUCTS_FILE.exists(), "products.js not found"


def test_html_has_shop_content():
    html = HTML_FILE.read_text(encoding="utf-8")

    assert "<html" in html.lower()
    assert "<body" in html.lower()
    assert "ShopEase" in html


def test_css_has_styles():
    css = CSS_FILE.read_text(encoding="utf-8")

    assert len(css.strip()) > 0
    assert "body" in css


def test_add_cart_button_color():
    css = CSS_FILE.read_text(encoding="utf-8")

    assert "background: #315dcc;" in css, (
        "TARGET_FILE: style.css - "
        "The .add-cart button background must be #315dcc."
    )
