// Данные товаров
const products = [
    { id: 1, name: "Футболка", price: 20, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Кружка", price: 10, image: "https://via.placeholder.com/100" },
    { id: 3, name: "Носки", price: 5, image: "https://via.placeholder.com/100" }
];

let cart = [];
const tg = window.Telegram.WebApp;

// Инициализация Mini App
tg.expand(); // На весь экран
renderProducts();

// Отображение товаров
function renderProducts() {
    const container = document.getElementById('products');
    container.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" width="100">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">В корзину</button>
        </div>
    `).join('');
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Обновление корзины
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    
    cartItems.innerHTML = cart.map(item => `
        <li>${item.name} - $${item.price}</li>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalElement.textContent = total;
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Отправка данных в бота
    tg.sendData(JSON.stringify({
        action: "checkout",
        items: cart,
        total: total,
        user_id: tg.initDataUnsafe.user?.id
    }));
    
    // Закрыть Mini App после оплаты
    tg.close();
}