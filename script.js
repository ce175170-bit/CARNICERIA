/* =========================================================
   CARNICERÍA EL MAGO - JAVASCRIPT PRINCIPAL
========================================================= */

"use strict";

/* =========================================================
   CONFIGURACIÓN
   Número de WhatsApp con código de país (Bolivia = 591)
========================================================= */
const NUMERO_WHATSAPP = "59167933907";
const CLAVE_CARRITO = "carniceria-el-mago-carrito";

/* =========================================================
   ELEMENTOS DEL DOM
========================================================= */
const $ = (id) => document.getElementById(id);

const botonMenu = $("botonMenu");
const navegacion = $("navegacion");

const carritoLateral = $("carritoLateral");
const fondoCarrito = $("fondoCarrito");
const itemsCarrito = $("itemsCarrito");
const contadorCarrito = $("contadorCarrito");
const totalCarrito = $("totalCarrito");
const botonPedido = $("botonPedido");

const buscadorProductos = $("buscadorProductos");
const filtroCategoria = $("filtroCategoria");
const textoResultados = $("textoResultados");
const sinProductos = $("sinProductos");

const modalPedido = $("modalPedido");
const formularioPedido = $("formularioPedido");
const nombreCliente = $("nombreCliente");
const celularCliente = $("celularCliente");
const notaCliente = $("notaCliente");
const itemsResumen = $("itemsResumen");
const totalResumen = $("totalResumen");

const modalConfirmacion = $("modalConfirmacion");

/* =========================================================
   ESTADO
========================================================= */
let carrito = cargarCarrito();

/* =========================================================
   UTILIDADES
========================================================= */
const formatearPrecio = (valor) => Number(valor).toFixed(2);

function escaparHTML(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function cargarCarrito() {
    try {
        const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
        return Array.isArray(datos) ? datos : [];
    } catch {
        return [];
    }
}

function guardarCarrito() {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch {
        /* almacenamiento no disponible: se ignora */
    }
}

/* =========================================================
   MENÚ MÓVIL
========================================================= */
function cambiarMenu(abrir) {
    navegacion.classList.toggle("active", abrir);
    const icono = botonMenu.querySelector("i");
    icono.classList.toggle("fa-xmark", abrir);
    icono.classList.toggle("fa-bars", !abrir);
}

botonMenu?.addEventListener("click", () => {
    cambiarMenu(!navegacion.classList.contains("active"));
});

navegacion?.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) cambiarMenu(false);
});

/* =========================================================
   VENTANAS (carrito y modales)
========================================================= */
function bloquearScroll(bloquear) {
    document.body.style.overflow = bloquear ? "hidden" : "";
}

function abrirCarrito() {
    carritoLateral.classList.add("active");
    fondoCarrito.classList.add("active");
    bloquearScroll(true);
}

function cerrarCarrito(liberarScroll = true) {
    carritoLateral.classList.remove("active");
    fondoCarrito.classList.remove("active");
    if (liberarScroll) bloquearScroll(false);
}

function abrirModal(modal) {
    modal.classList.add("active");
    bloquearScroll(true);
}

function cerrarModal(modal) {
    modal.classList.remove("active");
    bloquearScroll(false);
}

function irAProductos() {
    cerrarCarrito();
    $("productos").scrollIntoView({ behavior: "smooth" });
}

$("abrirCarrito")?.addEventListener("click", abrirCarrito);
$("abrirCarritoPortada")?.addEventListener("click", abrirCarrito);
$("cerrarCarrito")?.addEventListener("click", () => cerrarCarrito());
fondoCarrito?.addEventListener("click", () => cerrarCarrito());

$("cerrarModalPedido")?.addEventListener("click", () => cerrarModal(modalPedido));
$("cerrarConfirmacion")?.addEventListener("click", () => cerrarModal(modalConfirmacion));

// Cerrar modales al hacer clic en el fondo oscuro
[modalPedido, modalConfirmacion].forEach((modal) => {
    modal?.addEventListener("click", (evento) => {
        if (evento.target === modal) cerrarModal(modal);
    });
});

// Cerrar todo con la tecla ESC
document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;
    if (carritoLateral.classList.contains("active")) cerrarCarrito();
    if (modalPedido.classList.contains("active")) cerrarModal(modalPedido);
    if (modalConfirmacion.classList.contains("active")) cerrarModal(modalConfirmacion);
});

// Cerrar el menú móvil al hacer clic fuera
document.addEventListener("click", (evento) => {
    if (
        navegacion.classList.contains("active") &&
        !navegacion.contains(evento.target) &&
        !botonMenu.contains(evento.target)
    ) {
        cambiarMenu(false);
    }
});

/* =========================================================
   AGREGAR PRODUCTOS AL CARRITO
   Funciona con cualquier botón .agregar-carrito (incluso los que
   crea productos.js después).
========================================================= */
document.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".agregar-carrito");
    if (!boton) return;

    const nombre = boton.dataset.producto;
    const precio = parseFloat(boton.dataset.precio);
    const unidad = boton.dataset.unidad;

    if (!nombre || Number.isNaN(precio)) return;

    const tarjeta = boton.closest(".tarjeta-producto");
    const imagen = tarjeta
        ? tarjeta.querySelector(".producto-imagen .img-principal") ||
          tarjeta.querySelector(".producto-imagen img")
        : null;

    const existente = carrito.find((item) => item.nombre === nombre);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            nombre,
            precio,
            unidad,
            cantidad: 1,
            imagen: imagen ? imagen.getAttribute("src") : ""
        });
    }

    actualizarCarrito();

    boton.classList.add("pulso-carrito");
    setTimeout(() => boton.classList.remove("pulso-carrito"), 400);

    abrirCarrito();
});

/* =========================================================
   DIBUJAR EL CARRITO
========================================================= */
const HTML_CARRITO_VACIO = `
    <div class="carrito-vacio">
        <i class="fa-solid fa-cart-shopping"></i>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega productos para comenzar tu compra.</p>
        <button data-accion="ver-productos" type="button">
            <i class="fa-solid fa-basket-shopping"></i>
            Ver productos
        </button>
    </div>`;

function dibujarCarrito() {
    if (carrito.length === 0) {
        itemsCarrito.innerHTML = HTML_CARRITO_VACIO;
        return;
    }

    itemsCarrito.innerHTML = carrito.map((item, indice) => `
        <div class="carrito-item">
            <div class="carrito-item-imagen">
                <img src="${escaparHTML(item.imagen)}" alt="${escaparHTML(item.nombre)}" loading="lazy">
            </div>

            <div class="carrito-item-info">
                <h4>${escaparHTML(item.nombre)}</h4>
                <span>Bs. ${formatearPrecio(item.precio)} / ${escaparHTML(item.unidad)}</span>

                <div class="carrito-item-controles">
                    <button data-accion="disminuir" data-indice="${indice}" aria-label="Disminuir cantidad" type="button">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="carrito-cantidad">${item.cantidad}</span>
                    <button data-accion="aumentar" data-indice="${indice}" aria-label="Aumentar cantidad" type="button">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>

            <div>
                <strong>Bs. ${formatearPrecio(item.precio * item.cantidad)}</strong>
                <button class="quitar-item" data-accion="eliminar" data-indice="${indice}" aria-label="Eliminar producto" type="button">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>`).join("");
}

// Un solo "oyente" para todos los botones del carrito (delegación)
itemsCarrito?.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-accion]");
    if (!boton) return;

    if (boton.dataset.accion === "ver-productos") {
        irAProductos();
        return;
    }

    const indice = parseInt(boton.dataset.indice, 10);
    const item = carrito[indice];
    if (!item) return;

    switch (boton.dataset.accion) {
        case "aumentar":
            item.cantidad++;
            break;
        case "disminuir":
            if (item.cantidad > 1) item.cantidad--;
            else carrito.splice(indice, 1);
            break;
        case "eliminar":
            carrito.splice(indice, 1);
            break;
    }

    actualizarCarrito();
});

/* =========================================================
   CONTADOR Y TOTAL
========================================================= */
function calcularTotal() {
    return carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

function actualizarCarrito() {
    dibujarCarrito();

    contadorCarrito.textContent = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    totalCarrito.textContent = `Bs. ${formatearPrecio(calcularTotal())}`;
    botonPedido.disabled = carrito.length === 0;

    guardarCarrito();
}

/* =========================================================
   FORMULARIO DE PEDIDO
========================================================= */
botonPedido?.addEventListener("click", () => {
    if (carrito.length === 0) return;

    dibujarResumen();
    cerrarCarrito(false);
    abrirModal(modalPedido);
});

function dibujarResumen() {
    itemsResumen.innerHTML = carrito.map((item) => `
        <div class="resumen-item">
            <span>${item.cantidad} × ${escaparHTML(item.nombre)}</span>
            <strong>Bs. ${formatearPrecio(item.precio * item.cantidad)}</strong>
        </div>`).join("");

    totalResumen.textContent = `Bs. ${formatearPrecio(calcularTotal())}`;
}

function construirMensaje(nombre, celular, nota) {
    const lineas = [
        "🥩 *NUEVO PEDIDO*",
        "",
        `*Cliente:* ${nombre}`,
        `*Celular:* ${celular}`,
        "",
        "*PRODUCTOS:*"
    ];

    carrito.forEach((item) => {
        lineas.push("");
        lineas.push(
            `• ${item.nombre} — ${item.cantidad} ${item.unidad} — Bs. ${formatearPrecio(item.precio * item.cantidad)}`
        );
    });

    lineas.push("", `*TOTAL: Bs. ${formatearPrecio(calcularTotal())}*`);

    if (nota) {
        lineas.push("", "*Observaciones:*", nota);
    }

    return lineas.join("\n");
}

formularioPedido?.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = nombreCliente.value.trim();
    const celular = celularCliente.value.trim();
    const nota = notaCliente.value.trim();

    if (!nombre) {
        alert("Por favor, escribe tu nombre.");
        nombreCliente.focus();
        return;
    }

    if (!celular) {
        alert("Por favor, escribe tu número de celular.");
        celularCliente.focus();
        return;
    }

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        cerrarModal(modalPedido);
        return;
    }

    const mensaje = construirMensaje(nombre, celular, nota);
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank", "noopener,noreferrer");

    cerrarModal(modalPedido);
    setTimeout(() => abrirModal(modalConfirmacion), 300);

    formularioPedido.reset();
    carrito = [];
    actualizarCarrito();
});

/* =========================================================
   BUSCADOR Y FILTRO DE PRODUCTOS
========================================================= */
function filtrarProductos() {
    if (!buscadorProductos || !filtroCategoria) return;

    const tarjetas = document.querySelectorAll(".tarjeta-producto");
    const texto = buscadorProductos.value.trim().toLowerCase();
    const categoria = filtroCategoria.value;

    let visibles = 0;

    tarjetas.forEach((tarjeta) => {
        const nombre = (tarjeta.dataset.nombre || "").toLowerCase();
        const coincide =
            nombre.includes(texto) &&
            (categoria === "todos" || tarjeta.dataset.categoria === categoria);

        tarjeta.style.display = coincide ? "" : "none";
        if (coincide) visibles++;
    });

    sinProductos.style.display = visibles === 0 ? "block" : "none";

    if (visibles === 0) {
        textoResultados.textContent = "No se encontraron productos.";
    } else if (visibles === tarjetas.length) {
        textoResultados.textContent = "Mostrando todos los productos.";
    } else {
        textoResultados.textContent =
            `Mostrando ${visibles} producto${visibles === 1 ? "" : "s"}.`;
    }
}

// Pequeña espera al escribir para no filtrar en cada tecla
let temporizadorBusqueda;
buscadorProductos?.addEventListener("input", () => {
    clearTimeout(temporizadorBusqueda);
    temporizadorBusqueda = setTimeout(filtrarProductos, 120);
});

filtroCategoria?.addEventListener("change", filtrarProductos);

// productos.js avisa con este evento cuando termina de dibujar las tarjetas
document.addEventListener("productosRenderizados", filtrarProductos);

/* =========================================================
   WHATSAPP DEL PIE DE PÁGINA Y AÑO AUTOMÁTICO
========================================================= */
function configurarPie() {
    const mensaje = "Hola, quiero consultar/reservar algunos productos de la carnicería.";
    const enlace = $("whatsappPie");

    if (enlace) {
        enlace.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    }

    const anio = $("anioActual");
    if (anio) anio.textContent = new Date().getFullYear();
}

/* =========================================================
   INICIO
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
    configurarPie();
    filtrarProductos();
});