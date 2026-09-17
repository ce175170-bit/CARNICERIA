/* =========================================================
   CARNICERÍA - JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

// IMPORTANTE:
// Escribe el número de WhatsApp con código de país.
// Bolivia = 591
//
// EJEMPLO:
// const WHATSAPP_NUMBER = "59170000000";

const WHATSAPP_NUMBER = "59169621569";


// Enlace del grupo de WhatsApp
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/COLOCA_AQUI_EL_ENLACE";


/* =========================================================
   VARIABLES
========================================================= */

let cart = [];


/* =========================================================
   ELEMENTOS DEL DOM
========================================================= */

// MENÚ
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");


// CARRITO
const openCart = document.getElementById("openCart");
const openCartHero = document.getElementById("openCartHero");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const continueShopping = document.getElementById("continueShopping");


// PRODUCTOS
const productsGrid = document.getElementById("productsGrid");
const productCards = document.querySelectorAll(".product-card");

const productSearch = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const productResultText = document.getElementById("productResultText");
const noProducts = document.getElementById("noProducts");


// MODAL PEDIDO
const orderModal = document.getElementById("orderModal");
const closeOrderModal = document.getElementById("closeOrderModal");
const orderForm = document.getElementById("orderForm");

const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const customerNote = document.getElementById("customerNote");

const orderSummaryItems = document.getElementById("orderSummaryItems");
const orderSummaryTotal = document.getElementById("orderSummaryTotal");


// MODAL CONFIRMACIÓN
const confirmationModal = document.getElementById("confirmationModal");
const closeConfirmation = document.getElementById("closeConfirmation");


// FOOTER
const footerWhatsapp = document.getElementById("footerWhatsapp");
const whatsappGroup = document.getElementById("whatsappGroup");
const footerWhatsappIcon = document.getElementById("footerWhatsappIcon");
const currentYear = document.getElementById("currentYear");


/* =========================================================
   INICIO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateCart();

    setupWhatsAppLinks();

    setupCurrentYear();

});


/* =========================================================
   MENÚ MÓVIL
========================================================= */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navigation.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navigation.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   CERRAR MENÚ AL PULSAR UN ENLACE
========================================================= */

const navigationLinks = navigation
    ? navigation.querySelectorAll("a")
    : [];

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   CERRAR MENÚ AL HACER CLICK FUERA
========================================================= */

document.addEventListener("click", (event) => {

    if (!navigation || !menuToggle) return;

    const clickDentroMenu = navigation.contains(event.target);

    const clickBotonMenu = menuToggle.contains(event.target);

    if (
        navigation.classList.contains("active") &&
        !clickDentroMenu &&
        !clickBotonMenu
    ) {

        navigation.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    }

});


/* =========================================================
   ABRIR CARRITO
========================================================= */

function openCartSidebar() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CERRAR CARRITO
========================================================= */

function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


if (openCart) {

    openCart.addEventListener("click", openCartSidebar);

}


if (openCartHero) {

    openCartHero.addEventListener("click", openCartSidebar);

}


if (closeCart) {

    closeCart.addEventListener("click", closeCartSidebar);

}


if (cartOverlay) {

    cartOverlay.addEventListener("click", closeCartSidebar);

}


if (continueShopping) {

    continueShopping.addEventListener("click", () => {

        closeCartSidebar();

        document
            .getElementById("productos")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}


/* =========================================================
   AGREGAR PRODUCTOS AL CARRITO
========================================================= */

const addCartButtons = document.querySelectorAll(".add-cart");


addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName = button.dataset.product;

        const productPrice = parseFloat(button.dataset.price);

        const productUnit = button.dataset.unit;


        /*
         * Buscamos la tarjeta del producto
         * para obtener su imagen.
         */

        const productCard = button.closest(".product-card");

        const imageElement = productCard
            ? productCard.querySelector(".product-image img")
            : null;

        const productImage = imageElement
            ? imageElement.getAttribute("src")
            : "";


        /*
         * Verificamos si ya existe
         */

        const existingProduct = cart.find(
            item => item.name === productName
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: productName,

                price: productPrice,

                unit: productUnit,

                quantity: 1,

                image: productImage

            });

        }


        updateCart();


        /*
         * Animación del botón
         */

        button.classList.add("cart-pulse");


        setTimeout(() => {

            button.classList.remove("cart-pulse");

        }, 400);


        /*
         * Abrir carrito automáticamente
         */

        openCartSidebar();

    });

});


/* =========================================================
   ACTUALIZAR CARRITO
========================================================= */

function updateCart() {

    renderCart();

    updateCartCount();

    updateCartTotal();

}


/* =========================================================
   MOSTRAR PRODUCTOS DEL CARRITO
========================================================= */

function renderCart() {

    if (!cartItems) return;


    /*
     * Si no hay productos
     */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart" id="emptyCart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agrega productos para comenzar tu compra.
                </p>

                <button id="continueShopping">
                    <i class="fa-solid fa-basket-shopping"></i>
                    Ver productos
                </button>

            </div>

        `;


        const newContinueButton =
            document.getElementById("continueShopping");


        if (newContinueButton) {

            newContinueButton.addEventListener("click", () => {

                closeCartSidebar();

                document
                    .getElementById("productos")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            });

        }


        return;

    }


    /*
     * Dibujar productos
     */

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                >

            </div>


            <div class="cart-item-info">

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <span>
                    Bs. ${formatPrice(item.price)}
                    / ${escapeHTML(item.unit)}
                </span>


                <div class="cart-item-controls">

                    <button
                        class="decrease-item"
                        data-index="${index}"
                        aria-label="Disminuir cantidad"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </button>


                    <span class="cart-quantity">
                        ${item.quantity}
                    </span>


                    <button
                        class="increase-item"
                        data-index="${index}"
                        aria-label="Aumentar cantidad"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

            </div>


            <div>

                <strong>
                    Bs. ${formatPrice(itemTotal)}
                </strong>


                <button
                    class="remove-item"
                    data-index="${index}"
                    aria-label="Eliminar producto"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    setupCartControls();

}


/* =========================================================
   CONTROLES DEL CARRITO
========================================================= */

function setupCartControls() {


    /*
     * AUMENTAR
     */

    const increaseButtons =
        document.querySelectorAll(".increase-item");


    increaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                parseInt(button.dataset.index);


            if (cart[index]) {

                cart[index].quantity++;

                updateCart();

            }

        });

    });


    /*
     * DISMINUIR
     */

    const decreaseButtons =
        document.querySelectorAll(".decrease-item");


    decreaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                parseInt(button.dataset.index);


            if (!cart[index]) return;


            if (cart[index].quantity > 1) {

                cart[index].quantity--;

            } else {

                cart.splice(index, 1);

            }


            updateCart();

        });

    });


    /*
     * ELIMINAR
     */

    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                parseInt(button.dataset.index);


            if (cart[index]) {

                cart.splice(index, 1);

                updateCart();

            }

        });

    });

}


/* =========================================================
   CONTADOR DEL CARRITO
========================================================= */

function updateCartCount() {

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    if (cartCount) {

        cartCount.textContent = totalQuantity;

    }

}


/* =========================================================
   TOTAL CARRITO
========================================================= */

function calculateCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );

}


function updateCartTotal() {

    const total = calculateCartTotal();


    if (cartTotal) {

        cartTotal.textContent =
            `Bs. ${formatPrice(total)}`;

    }


    if (checkoutButton) {

        checkoutButton.disabled =
            cart.length === 0;

    }

}


/* =========================================================
   ABRIR FORMULARIO DE PEDIDO
========================================================= */

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        if (cart.length === 0) {

            return;

        }


        renderOrderSummary();


        orderModal.classList.add("active");


        document.body.style.overflow = "hidden";


        /*
         * Cerrar carrito
         */

        cartSidebar.classList.remove("active");

        cartOverlay.classList.remove("active");

    });

}


/* =========================================================
   CERRAR FORMULARIO
========================================================= */

if (closeOrderModal) {

    closeOrderModal.addEventListener("click", () => {

        closeOrderForm();

    });

}


function closeOrderForm() {

    orderModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   CERRAR MODAL HACIENDO CLICK FUERA
========================================================= */

if (orderModal) {

    orderModal.addEventListener("click", event => {

        if (event.target === orderModal) {

            closeOrderForm();

        }

    });

}


/* =========================================================
   RESUMEN DEL PEDIDO
========================================================= */

function renderOrderSummary() {

    if (!orderSummaryItems) return;


    orderSummaryItems.innerHTML = "";


    cart.forEach(item => {

        const total =
            item.price * item.quantity;


        const summaryItem =
            document.createElement("div");


        summaryItem.className =
            "summary-item";


        summaryItem.innerHTML = `

            <span>
                ${item.quantity} ×
                ${escapeHTML(item.name)}
            </span>

            <strong>
                Bs. ${formatPrice(total)}
            </strong>

        `;


        orderSummaryItems.appendChild(summaryItem);

    });


    const total = calculateCartTotal();


    if (orderSummaryTotal) {

        orderSummaryTotal.textContent =
            `Bs. ${formatPrice(total)}`;

    }

}


/* =========================================================
   ENVIAR PEDIDO POR WHATSAPP
========================================================= */

if (orderForm) {

    orderForm.addEventListener("submit", event => {

        event.preventDefault();


        /*
         * Obtener datos
         */

        const name =
            customerName.value.trim();


        const phone =
            customerPhone.value.trim();


        const note =
            customerNote.value.trim();


        /*
         * Validación
         */

        if (!name) {

            alert("Por favor, escribe tu nombre.");

            customerName.focus();

            return;

        }


        if (!phone) {

            alert("Por favor, escribe tu número de celular.");

            customerPhone.focus();

            return;

        }


        if (cart.length === 0) {

            alert("Tu carrito está vacío.");

            closeOrderForm();

            return;

        }


        /*
         * Construir mensaje
         */

        let message = "";


        message += "🥩 *NUEVO PEDIDO*%0A";

        message += "%0A";

        message += "*Cliente:* "
            + encodeURIComponent(name)
            + "%0A";

        message += "*Celular:* "
            + encodeURIComponent(phone)
            + "%0A";

        message += "%0A";

        message += "*PRODUCTOS:*%0A";


        cart.forEach(item => {

            const itemTotal =
                item.price * item.quantity;


            message += "%0A";

            message += "• "
                + encodeURIComponent(item.name);


            message += " — "
                + item.quantity
                + " "
                + encodeURIComponent(item.unit);


            message += " — Bs. "
                + formatPrice(itemTotal);

        });


        message += "%0A%0A";


        const total = calculateCartTotal();


        message += "*TOTAL: Bs. "
            + formatPrice(total)
            + "*";


        /*
         * Observación
         */

        if (note) {

            message += "%0A%0A";

            message += "*Observaciones:*%0A";

            message += encodeURIComponent(note);

        }


        /*
         * Crear enlace de WhatsApp
         */

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


        /*
         * Abrir WhatsApp
         */

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );


        /*
         * Cerrar formulario
         */

        closeOrderForm();


        /*
         * Mostrar confirmación
         */

        setTimeout(() => {

            showConfirmation();

        }, 300);


        /*
         * Limpiar formulario
         */

        orderForm.reset();


        /*
         * Vaciar carrito
         */

        cart = [];

        updateCart();

    });

}


/* =========================================================
   CONFIRMACIÓN
========================================================= */

function showConfirmation() {

    confirmationModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


if (closeConfirmation) {

    closeConfirmation.addEventListener("click", () => {

        confirmationModal.classList.remove("active");

        document.body.style.overflow = "";

    });

}


if (confirmationModal) {

    confirmationModal.addEventListener("click", event => {

        if (event.target === confirmationModal) {

            confirmationModal.classList.remove("active");

            document.body.style.overflow = "";

        }

    });

}


/* =========================================================
   ESC PARA CERRAR VENTANAS
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;


    if (cartSidebar.classList.contains("active")) {

        closeCartSidebar();

    }


    if (orderModal.classList.contains("active")) {

        closeOrderForm();

    }


    if (confirmationModal.classList.contains("active")) {

        confirmationModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});


/* =========================================================
   BUSCADOR DE PRODUCTOS
========================================================= */

function filterProducts() {

    const searchText =
        productSearch.value
            .trim()
            .toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    let visibleProducts = 0;


    productCards.forEach(card => {

        const productName =
            card.dataset.name.toLowerCase();


        const category =
            card.dataset.category;


        const matchesSearch =
            productName.includes(searchText);


        const matchesCategory =
            selectedCategory === "todos" ||
            category === selectedCategory;


        if (matchesSearch && matchesCategory) {

            card.style.display = "";

            visibleProducts++;

        } else {

            card.style.display = "none";

        }

    });


    /*
     * Texto de resultados
     */

    if (visibleProducts === 0) {

        noProducts.style.display = "block";

        productResultText.textContent =
            "No se encontraron productos.";

    } else {

        noProducts.style.display = "none";


        if (visibleProducts === productCards.length) {

            productResultText.textContent =
                "Mostrando todos los productos.";

        } else {

            productResultText.textContent =
                `Mostrando ${visibleProducts} producto${visibleProducts === 1 ? "" : "s"}.`;

        }

    }

}


/* =========================================================
   EVENTOS BUSCADOR
========================================================= */

if (productSearch) {

    productSearch.addEventListener(
        "input",
        filterProducts
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


/* =========================================================
   WHATSAPP FOOTER
========================================================= */

function setupWhatsAppLinks() {

    /*
     * Mensaje del botón de reserva
     */

    const reservationMessage =
        "Hola, quiero consultar/reservar algunos productos de la carnicería.";


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(reservationMessage)}`;


    /*
     * Reservar por WhatsApp
     */

    if (footerWhatsapp) {

        footerWhatsapp.href = whatsappURL;

    }


    /*
     * Icono WhatsApp
     */

    if (footerWhatsappIcon) {

        footerWhatsappIcon.href = whatsappURL;

    }


    /*
     * Grupo WhatsApp
     */

    if (whatsappGroup) {

        whatsappGroup.href =
            WHATSAPP_GROUP_LINK;

    }

}


/* =========================================================
   AÑO AUTOMÁTICO
========================================================= */

function setupCurrentYear() {

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   FORMATO DE PRECIOS
========================================================= */

function formatPrice(value) {

    return Number(value).toFixed(2);

}


/* =========================================================
   SEGURIDAD HTML
========================================================= */

function escapeHTML(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   FIN DEL JAVASCRIPT
========================================================= */