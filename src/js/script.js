document.addEventListener('DOMContentLoaded', function () {
    const btnNewOrder = document.getElementById('btnNewOrder');
    const btnAddProductToOrder = document.getElementById('btnAddProductToOrder');
    const ordersList = document.getElementById('ordersList');
    const productsList = document.getElementById('productsList');
    const newProductNameInput = document.getElementById('newProductName');
    const newProductDescriptionInput = document.getElementById('newProductDescription');
    const orderStatus = document.getElementById('orderStatus');
    const orderDetalisSection = document.getElementById('orderDetalisSection');
    const btnRegisterProduct = document.getElementById('btnRegisterProduct');
    const availableProductsList = document.getElementById('availableProductsList');
    const btnCloseOrder = document.getElementById('btnCloseOrder');
    const btnToggleProductRegistration = document.getElementById('btnToggleProductRegistration');
    const productRegistrationSection = document.getElementById('productRegistrationSection');
    const btnGenerateReport = document.getElementById('btnGenerateReport');

    btnToggleProductRegistration.addEventListener('click', () => {
        productRegistrationSection.style.display = productRegistrationSection.style.display === 'none' ? 'block' : 'none';
    });

    function renderAvailableProducts() {
        availableProductsList.innerHTML = '';
        const productSelect = document.getElementById('productSelect');
        productSelect.innerHTML = '';
        orderService.listProducts().forEach(product => {
            const li = document.createElement('li');
            li.textContent = `ID: ${product.id} - ${product.name} - ${product.description}`;
            availableProductsList.appendChild(li);

            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `ID: ${product.id} - ${product.name} - ${product.description}`;
            productSelect.appendChild(option);
        });
    }

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

    btnRegisterProduct.addEventListener('click', () => {
        const productName = newProductNameInput.value.trim();
        const productDescription = newProductDescriptionInput.value.trim();

        if (productName && productDescription && productName.length <= 50 && productDescription.length <= 50) {
            orderService.registerProduct(productName, productDescription);
            newProductNameInput.value = '';
            newProductDescriptionInput.value = '';
            renderAvailableProducts();
        } else {
            alert('Por favor, preencha o nome e a descrição do produto (máximo 50 caracteres cada).');
        }
    });

    function showOrderDetails(order) {
        orderService.currentOrder = order;
        orderDetalisSection.style.display = 'block';
        orderStatus.textContent = `Status: ${order.status}`;
        productsList.innerHTML = '';

        const orderIdDisplay = document.getElementById('orderIdDisplay');
        orderIdDisplay.textContent = `ID #${order.id}`;

        if (order.status === 'Fechado') {
            orderStatus.style.color = 'red';
            btnAddProductToOrder.style.display = 'none';
            btnCloseOrder.style.display = 'none';
            productSelect.style.display = 'none'
        } else {
            orderStatus.style.color = 'green';
            btnAddProductToOrder.style.display = 'block';
            btnCloseOrder.style.display = order.products.length > 0 ? 'block' : 'none';
            productSelect.style.display = 'block'
        }

        order.products.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.description}`;

            if (order.status !== 'Fechado') {
                const btnRemove = document.createElement('button');
                btnRemove.textContent = 'Remover';
                btnRemove.addEventListener('click', () => {
                    orderService.removeProductFromOrder(index);
                    showOrderDetails(order);
                });
                li.appendChild(btnRemove);
            }

            productsList.appendChild(li);
        });
    }

    btnNewOrder.addEventListener('click', () => {
        const newOrder = orderService.createNewOrder();
        showOrderDetails(newOrder);
        renderOrders();
    });

    btnAddProductToOrder.addEventListener('click', () => {
        const productSelect = document.getElementById('productSelect');
        const selectedProductId = parseInt(productSelect.value);
        if (selectedProductId) {
            orderService.addProductToOrder(selectedProductId);
            showOrderDetails(orderService.currentOrder);
        } else {
            alert('Por favor, selecione um produto.');
        }
    });

    btnCloseOrder.addEventListener('click', () => {
        orderService.closeOrder();
        renderOrders();
        showOrderDetails(orderService.currentOrder);
    });

    renderOrders();

    async function generateReport() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text('Relatório De Pedidos Fechados', 10, 10);
        doc.setFontSize(12);

        const closeOrders = orderService.orders.filter(order => order.status === 'Fechado');

        if (closeOrders.length === 0) {
            doc.text('Nenhum Pedido Fechado Encontado.', 10, 20);
        } else {
            let y = 20;
            closeOrders.forEach(order => {
                doc.text(`Pedido #${order.id} - Status: ${order.status}`, 18, y);
                y += 10;

                order.products.forEach(product => {
                    doc.text(`  - ${product.name} - ${product.description}`, 10, y);
                    y += 10;
                });
                y += 5;
            });
        }

        doc.save("relatorio_pedidos_fechados.pdf");
    }
    
    btnGenerateReport.addEventListener('click', generateReport);

});