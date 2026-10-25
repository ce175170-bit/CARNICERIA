/* =====================================================
   CATÁLOGO DE PRODUCTOS
   Para agregar un producto: copia una línea de la lista
   PRODUCTOS, pégala al final y cambia los datos.
===================================================== */

/* Nombre que se muestra en la etiqueta de cada categoría.
   La clave debe coincidir con los <option value="..."> del filtro. */
const CATEGORIAS = {
    cerdo: "Carne de cerdo",
    embutidos: "Embutidos",
    varios: "Productos varios"
};

/* Descripciones que se repiten (así no las escribes muchas veces) */
const DESC_CORTE =
    "Corte tierno y sabroso, ideal para preparar a la parrilla, plancha o sartén.";
const DESC_CARBON =
    "¡Que no falte el carbón para tu parrillada! Ideal para asados, carnes a la parrilla y reuniones con familia y amigos.";
const DESC_LIMONERO =
    "El toque cítrico perfecto para tus ensaladas, bebidas y recetas favoritas. Práctico, delicioso y listo para usar. ¡No te quedes sin el tuyo!";
const DESC_SOYA =
    "Su delicioso sabor realza tus carnes, arroces, salteados y recetas favoritas. ¡El ingrediente perfecto para llevar tus platos a otro nivel!";

/* =====================================================
   LISTA DE PRODUCTOS
   nombre      : nombre del producto
   categoria   : cerdo | embutidos | varios
   imagen      : ruta de la imagen
   descripcion : texto breve
   precio      : solo el número
   unidad      : kg, Unidad, Bolsa, Maple, litro...
   etiqueta    : (opcional) tamaño o variante, ej. "Grande"
===================================================== */
const PRODUCTOS = [
    { nombre: "Chuleta de cerdo", 
      categoria: "cerdo", 
      imagen: "imagenes/carne1.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Aguja", 
      categoria: "cerdo", 
      imagen: "imagenes/carne2.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Chuleta de pierna", 
      categoria: "cerdo", 
      imagen: "imagenes/carne3.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Panceta", 
      categoria: "cerdo", 
      imagen: "imagenes/carne4.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 40, 
      unidad: "kg" },

      { nombre: "Codillo delantero", 
      categoria: "cerdo", 
      imagen: "imagenes/carne5.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Costillar", 
      categoria: "cerdo", 
      imagen: "imagenes/carne6.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 45, 
      unidad: "kg" },

      { nombre: "Solomillo", 
      categoria: "cerdo", 
      imagen: "imagenes/carne7.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Matambre", 
      categoria: "cerdo", 
      imagen: "imagenes/carne8.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 85, 
      unidad: "kg" },

      { nombre: "Lomo", 
      categoria: "cerdo", 
      imagen: "imagenes/carne9.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Paleta", 
      categoria: "cerdo", 
      imagen: "imagenes/carne10.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Pechito", 
      categoria: "cerdo", 
      imagen: "imagenes/carne11.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Pechuga", 
      categoria: "cerdo", 
      imagen: "imagenes/carne12.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Medallones", 
      categoria: "cerdo", 
      imagen: "imagenes/carne13.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 40, 
      unidad: "kg" },

      { nombre: "Tocino", 
      categoria: "cerdo", 
      imagen: "imagenes/carne14.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 40, 
      unidad: "kg" },

      { nombre: "Jarrete", 
      categoria: "cerdo", 
      imagen: "imagenes/carne15.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Puntas de costilla", 
      categoria: "cerdo", 
      imagen: "imagenes/carne16.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 40, 
      unidad: "kg" },

      { nombre: "Nudo", 
      categoria: "cerdo", 
      imagen: "imagenes/carne17.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Jamón deshuesado", 
      categoria: "cerdo", 
      imagen: "imagenes/carne18.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 40, 
      unidad: "kg" },

       { nombre: "Pierna", 
      categoria: "cerdo", 
      imagen: "imagenes/carne19.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Cadera", 
      categoria: "cerdo", 
      imagen: "imagenes/carne20.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Cuello", 
      categoria: "cerdo", 
      imagen: "imagenes/carne21.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 40, 
      unidad: "kg" },

      { nombre: "Costilla de cerdo", 
      categoria: "cerdo", 
      imagen: "imagenes/carne22.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Chuleta de costillar", 
      categoria: "cerdo", 
      imagen: "imagenes/carne23.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 35, 
      unidad: "kg" },

      { nombre: "Cabeza de cerdo", 
      categoria: "cerdo", 
      imagen: "imagenes/cabeza.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 55, 
      unidad: "Unidad" },

      { nombre: "Patas de cerdo", 
      categoria: "cerdo", 
      imagen: "imagenes/patas.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 18, 
      unidad: "kg" },

      { nombre: "Chorizo", 
      categoria: "Embutido", 
      imagen: "imagenes/chorizo.webp",
      descripcion: "Sabor, suavidad y calidad ideal para preparar deliciosos platos en cualquier ocasión.",
      precio: 55, 
      unidad: "kg" },

      { nombre: "Mayonesa Kriss", 
      categoria: "varios", 
      imagen: "imagenes/producto1.webp",
      descripcion: "Tamaño pequeño personal, sabor completo. La mayonesa más pequeña, perfecta para sándwiches, ensaladas y papas.",
      precio: 2.50, 
      unidad: "Unidad" },

      { nombre: "Ketchup Kriss", 
      categoria: "varios", 
      imagen: "imagenes/producto2.webp",
      descripcion: "Pequeño en tamaño, grande en sabor. El ketchup ideal para acompañar tus comidas favoritas.",
      precio: 2.50, 
      unidad: "Unidad" },

      { nombre: "Mostaza Kriss", 
      categoria: "varios", 
      imagen: "imagenes/producto3.webp",
      descripcion: "Pequeña en tamaño, grande en sabor. La mostaza perfecta para tus comidas favoritas.",
      precio: 2.50, 
      unidad: "Unidad" },

       { nombre: "Huevo", 
      categoria: "varios", 
      imagen: "imagenes/producto4.webp",
      descripcion: "Huevos seleccionados, frescos y de gran calidad. Ideales para toda la familia.",
      precio: 30, 
      unidad: "Maple" },

      { nombre: "Sal parrillero con papaya", 
      categoria: "varios", 
      imagen: "imagenes/producto5.webp",
      descripcion: "El secreto de una buena parrillada: sal gruesa que se adhiere a la carne y realza todo su sabor.",
      precio: 20, 
      unidad: "Unidad" },

      { nombre: "Salsa soya grande", 
      categoria: "varios", 
      imagen: "imagenes/producto6.webp",
      descripcion: "El sabor oriental que realza tus platos, en tamaño pequeño. Perfecta para carnes, arroces y salteados.",
      precio: 15, 
      unidad: "Unidad" },

      { nombre: "Salsa soya pequeño", 
      categoria: "varios", 
      imagen: "imagenes/producto6.webp",
      descripcion: "El sabor oriental que realza tus platos, en tamaño pequeño. Perfecta para carnes, arroces y salteados.",
      precio: 7, 
      unidad: "Unidad" },

      { nombre: "Limonera grande", 
      categoria: "varios", 
      imagen: "imagenes/producto7.webp",
      descripcion: "El sabor cítrico de siempre en tamaño grande. Práctico y listo para usar.",
      precio: 15, 
      unidad: "Unidad" },

      { nombre: "Limonera pequeña", 
      categoria: "varios", 
      imagen: "imagenes/producto7.webp",
      descripcion: "El sabor cítrico de siempre en tamaño pequeño. Práctico y listo para usar.",
      precio: 7, 
      unidad: "Unidad" },

      { nombre: "Carbon bolsa pequeño", 
      categoria: "varios", 
      imagen: "imagenes/producto10.webp",
      descripcion: "Brasa duradera y calor parejo para que tu asado salga perfecto. Que no falte el carbón en tu parrillada.",
      precio: 15, 
      unidad: "Bolsa" },

      { nombre: "Carbon bolsa mediana", 
      categoria: "varios", 
      imagen: "imagenes/producto9.webp",
      descripcion: "Brasa duradera y calor parejo para que tu asado salga perfecto. Que no falte el carbón en tu parrillada.",
      precio: 28, 
      unidad: "Bolsa" },    

    { nombre: "Carbon bolsa grande", 
      categoria: "varios", 
      imagen: "imagenes/producto8.webp",
      descripcion: DESC_CARBON, 
      precio: 35, 
      unidad: "Bolsa" }

    /* 👉 Agrega nuevos productos aquí (no olvides la coma en el anterior):
    ,{ nombre: "Nuevo producto", categoria: "cerdo", imagen: "imagenes/nuevo.webp",
      descripcion: "Descripción breve.", precio: 20, unidad: "kg" }
    */
];

/* =====================================================
   GENERADOR DE TARJETAS (no necesitas tocar esto)
===================================================== */
function escaparHTML(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function crearTarjeta(p) {
    const categoriaTexto = CATEGORIAS[p.categoria] || p.categoria;
    const etiqueta = p.etiqueta ? " " + p.etiqueta : "";
    const nombreCarrito = p.nombre + etiqueta;
    const sep = p.unidad.toLowerCase() === "kg" ? " / " : "/";

    return `
    <article class="product-card"
             data-category="${escaparHTML(p.categoria)}"
             data-name="${escaparHTML(p.nombre.toLowerCase())}">
        <div class="product-image">
            <img class="bg-blur" src="${escaparHTML(p.imagen)}" alt="" aria-hidden="true">
            <img class="main-img" src="${escaparHTML(p.imagen)}" alt="${escaparHTML(p.nombre)}" loading="lazy">
            <span class="product-category">${escaparHTML(categoriaTexto)}</span>
        </div>
        <div class="product-info">
            <h3>${escaparHTML(p.nombre)}</h3>
            <p>${escaparHTML(p.descripcion)}</p>
            <div class="product-bottom">
                <div class="product-price">
                    <strong>Bs. ${escaparHTML(p.precio)}${escaparHTML(etiqueta)}</strong>
                    <span>${sep}${escaparHTML(p.unidad)}</span>
                </div>
                <button class="add-cart"
                        data-product="${escaparHTML(nombreCarrito)}"
                        data-price="${escaparHTML(p.precio)}"
                        data-unit="${escaparHTML(p.unidad)}"
                        type="button">
                    <i class="fa-solid fa-cart-plus"></i>
                    Agregar al carrito
                </button>
            </div>
        </div>
    </article>`;
}

function renderizarProductos() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;
    grid.innerHTML = PRODUCTOS.map(crearTarjeta).join("");
    document.dispatchEvent(new CustomEvent("productosRenderizados"));
}

renderizarProductos();
