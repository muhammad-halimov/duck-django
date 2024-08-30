const cartIcon = document.querySelector('.header-sections2 li:last-child');
const modal = document.getElementById('cartModal');
const closeButton = document.querySelector('.close-button');
const total = document.getElementById('total');
const total2 = document.getElementById('total2');
const cartItems = document.querySelector('.cart-items');
const deliveryForm = document.querySelector('.delivery-form');
const addToCartButtons = document.querySelectorAll('.product-section-block button');
const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Получаем информацию о товаре
        const product = {
            id: `${Date.now()}`, // Уникальный идентификатор товара
            name: button.previousElementSibling.previousElementSibling.previousElementSibling.textContent,
            img: button.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.src,
            price: button.previousElementSibling.textContent,
            quantity: 1 // Добавляем поле quantity
        };

        // Добавляем товар в корзину
        addToCart(product);
        updateCartTotal();
    });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (cart[product.id]) {
        // Если товар уже есть в корзине, увеличиваем его количество
        cart[product.id].quantity++;
    }
    else {
        // Если товара еще нет в корзине, добавляем его
        cart[product.id] = product;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let totalItems = 0;

    Object.values(cart).forEach(item => { totalItems += item.quantity; });

    cartIcon.innerHTML = `<img alt="" src="/static/assets/img/icons/cart.png" width="32" height="32">(${totalItems})`;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    Object.values(cart).forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <img class="cart-item-img" src="${item.img}" alt="">
            <span class="cart-item-price">${item.price}</span>
            <div class="cart-item-quantity">
                <button class="remove-from-cart">Удалить</button>
                <button class="decrease-quantity">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="increase-quantity">+</button>
            </div>
        `;

        cartItems.appendChild(cartItem);

        // Добавляем обработчики событий для кнопок увеличения/уменьшения количества
        const decreaseButton = cartItem.querySelector('.decrease-quantity');
        const increaseButton = cartItem.querySelector('.increase-quantity');
        decreaseButton.addEventListener('click', () => decreaseQuantity(item.id));
        increaseButton.addEventListener('click', () => increaseQuantity(item.id));

        // Добавляем обработчик события для кнопки "Удалить"
        const removeButton = cartItem.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', () => removeFromCart(item.id));
    });
}

function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (cart[productId].quantity > 1) {
        cart[productId].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
        updateCartTotal();
    }
    else {
        removeFromCart(productId);
        updateCartTotal();
    }
}

function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart[productId].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartDisplay();
    updateCartCount();
    updateCartTotal();
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    delete cart[productId];
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartDisplay();
    updateCartCount();
    updateCartTotal();
}

function calculateTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    Object.values(cart).forEach(item => {
            total += parseFloat(item.price.replace('$', '')) * item.quantity;
    });

    return total.toFixed(2);
}

function updateCartTotal() {
    total.innerHTML = `Оформление доставки. Итого: ${calculateTotal()}$`;
    total2.innerHTML = `Итого: ${calculateTotal()}$`;
}

// Обработка формы доставки
deliveryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const street = document.getElementById('street').value;
    const house = document.getElementById('house').value;
    const apartment = document.getElementById('apartment').value;
    const entrance = document.getElementById('entrance').value;
    const floor = document.getElementById('floor').value;

    // Здесь вы можете добавить логику для отправки заказа
    console.log('Новый заказ:', {
        name, phone, street, house, apartment, entrance, floor, cart: JSON.parse(localStorage.getItem('cart'))
    });

    // Очистка корзины после оформления заказа
    localStorage.removeItem('cart');
    updateCartDisplay();
    modal.style.display = 'none';
});

// Добавляем обработчик события для каждой кнопки
removeFromCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Получаем корзину из localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Удаляем элемент из корзины
        cart.splice(index, 1);

        // Сохраняем обновленную корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Обновляем отображение корзины
        updateCartDisplay();
        updateCartCount();
    });
});

// Открытие модального окна при клике на корзину
cartIcon.addEventListener('click', () => {
    modal.style.display = 'block';
    updateCartDisplay();
});

// Закрытие модального окна при клике на крестик
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('DOMContentLoaded', updateCartCount);
