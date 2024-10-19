document.addEventListener('DOMContentLoaded', function() {
    const btnNewOrder = document.getElementById('btnNewOrder');
    const btnAddProduct = document.getElementById('btnAddProduct');
    const btnCloseOrder = document.getElementById('btnCloseOrder');
    const ordersList = document.getElementById('ordersList');
    const productsList = document.getElementById('productsList');
    const productNameInput = document.getElementById('productNome');
    const productDescriptionInput = document.getElementById('productDescription');
    const orderStatus = document.getElementById('orderStatus');
    const orderDetalisSection = document.getElementById('orderDetalisSection');

    function renderOrders() {
        ordersList.innerHTML = '';
        orderService.listOrders().then(orders => {
            orders.forEach(order => {
                const li = document.createElement('li');
                li.textContent = `Pedido #${order.id} - ${order.status}`;
                li.addEventListener('click', () => showOrderDetails(order));
                ordersList.appendChild(li);
            });
        });
    }

    function showOrderDetails(order) {
        orderService.currentOrder = order;
        orderDetalisSection.style.display = 'block';
        orderStatus.textContent = `Status: ${order.status}`;
        productsList.innerHTML = '';
        order.products.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.description}`;
            const btnRemove = document.createElement('button');
            btnRemove.textContent = 'Remover';
            btnRemove.addEventListener('click', () => {
                orderService.removeProductFromOrder(index);
                showOrderDetails(order);
            });
            li.appendChild(btnRemove);
            productsList.appendChild(li);
        });
    
        btnCloseOrder.style.display = order.products.length > 0 && order.status === 'open' ? 'block' : 'none';
    }

    btnNewOrder.addEventListener('click', () => {
        const newOrder = orderService.createNewOrder();
        showOrderDetails(newOrder);
        renderOrders();
    });

    btnAddProduct.addEventListener('click', () => {
        const productName = productNameInput.value.trim();
        const productDescription = productDescriptionInput.value.trim();
    
        if (productName && productDescription && productName.length <= 50 && productDescription.length <= 50) {
            orderService.addProductToOrder(productName, productDescription);
            showOrderDetails(orderService.currentOrder);
            productNameInput.value = '';
            productDescriptionInput.value = '';
        } else if (productName.length > 50 || productDescription.length > 50) {
            alert('O nome e a descrição do produto devem ter no máximo 50 caracteres cada.');
        } else {
            alert('É preciso preencher todos os campos');
            productNameInput.value = '';
            productDescriptionInput.value = '';
        }
    });

    btnCloseOrder.addEventListener('click', () => {
        orderService.closeOrder();
        renderOrders();
        showOrderDetails(orderService.currentOrder);
    });

    renderOrders();
});
