const products = [
    { name: 'X-Salada', price: 10.0, extras: ['Queijo', 'Bacon'] },
    { name: 'Shawarma', price: 15.0, extras: ['Molho de Alho', 'Queijo'] },
    // Adicione mais produtos conforme necessário
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <p>${product.name} - R$${product.price}</p>
            <div>
                ${product.extras.map(extra => `
                    <label>
                        <input type="checkbox" value="${extra}" data-product="${product.name}"> ${extra}
                    </label>
                `).join('')}
            </div>
            <button onclick="addToCart('${product.name}')">Adicionar ao Carrinho</button>
        `;
        productContainer.appendChild(productElement);
    });

    updateCart();
});

function addToCart(productName) {
    const extras = Array.from(document.querySelectorAll(`input[data-product="${productName}"]:checked`))
                        .map(extra => extra.value);
    cart.push({ product: productName, extras: extras });
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = cart.map(item => `
        <p>${item.product} - Extras: ${item.extras.join(', ')}</p>
    `).join('');
}

function submitOrder(event) {
    event.preventDefault();
    const address = document.getElementById('address').value;
    fetch('/submit_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: address, cart: cart })
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Pedido realizado!');
              cart = [];
              updateCart();
          }
      });
}
