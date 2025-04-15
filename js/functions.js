// Función para actualizar el contador del carrito
function updateCartCounter() {
    const itemsInCart = document.querySelectorAll(".cart__item").length;
    const cartAmount = document.querySelector(".itemCounter");
    cartAmount.innerText = itemsInCart;
    if (itemsInCart == 0){
        cartAmount.classList.replace("itemCounter", "txtConToggle");
    };
}

// Función para agregar los listeners de eliminar a cada ícono
function setupRemoveButtons() {
    const iconRemove = document.querySelectorAll(".remove");

    iconRemove.forEach(elem => {
        elem.addEventListener("click", () => {
            const elemParent = elem.parentElement;
            elemParent.remove();
            updateCartCounter();
        });
    });
}

// Ejecutar funciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter();
    setupRemoveButtons();
    setupAddToCartButtons();

    // Mostrar y ocultar carrito
    const header = document.querySelector("header");
    const menuIcon = header.firstElementChild;
    const cartIcon = header.lastElementChild;
    const menu = document.querySelector(".menu");
    const cart = document.querySelector(".cart");
    const menuClsBtn = document.querySelector(".closebtn")

    menuIcon.addEventListener("click", () =>{
        menu.classList.remove("hide")
    });

    menuClsBtn.addEventListener("click", ()=>{
        menu.classList.add("hide")
    });

    cartIcon.addEventListener("click", () => {
        cart.classList.toggle("show");
    });


});

function setupAddToCartButtons() {
    const addCartButtons = document.querySelectorAll(".cartButton");
    const cartContainer = document.querySelector(".cart");

    addCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productItem = button.closest(".products__item");
            const productImageSrc = productItem.querySelector(".products__image").src;
            const productTitle = productItem.querySelector(".products__itemTitle").textContent;
            const productPrice = productItem.querySelector(".products__price").textContent;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart__item");

            cartItem.innerHTML = `
                <img class="cart__image" src="${productImageSrc}" alt="${productTitle}">
                <p>${productTitle}</p>
                <p>${productPrice}</p>
                <i class="remove"><img src="img/deleteTrashCanIcon.png" alt="Icono Quitar" class="deleteIcon"></i>
            `;

            // Insertar antes del botón de comprar
            const buyButton = document.querySelector(".cart__buyButton");
            cartContainer.insertBefore(cartItem, buyButton);

            // Reasignar listeners a todos los botones de eliminar
            setupRemoveButtons();
            updateCartCounter();
        });
    });
}
