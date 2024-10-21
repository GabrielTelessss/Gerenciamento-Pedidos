document.addEventListener('DOMContentLoaded', function () {
    const btnNewOrder = document.getElementById('btnNewOrder');
    const btnAddProductToOrder = document.getElementById('btnAddProductToOrder');
    const ordersList = document.getElementById('ordersList');
    const productsList = document.getElementById('productsList');
    const newProductNameInput = document.getElementById('newProductName');
    const newProductDescriptionInput = document.getElementById('newProductDescription');
    const orderStatus = document.getElementById('orderStatus');
    const orderDetailsSection = document.getElementById('orderDetailsSection');
    const btnRegisterProduct = document.getElementById('btnRegisterProduct');
    const availableProductsList = document.getElementById('availableProductsList');
    const btnCloseOrder = document.getElementById('btnCloseOrder');
    const btnToggleProductRegistration = document.getElementById('btnToggleProductRegistration');
    const productRegistrationSection = document.getElementById('productRegistrationSection');
    const btnGenerateReport = document.getElementById('btnGenerateReport');
    const totalDisplay = document.getElementById('totalDisplay');
    const btnCloseProductRegistration = document.getElementById('btnCloseProductRegistration');



    btnToggleProductRegistration.addEventListener('click', () => {
        productRegistrationSection.style.display = productRegistrationSection.style.display === 'none' ? 'block' : 'none';
    });

    btnCloseProductRegistration.addEventListener('click', () =>{
        productRegistrationSection.style.display = 'none';
    })
    

    function renderAvailableProducts() {
        availableProductsList.innerHTML = '';
        const productSelect = document.getElementById('productSelect');
        productSelect.innerHTML = '';
        orderService.listProducts().forEach(product => {
            const li = document.createElement('li');
            li.textContent = `ID: ${product.id} - ${product.name} - ${product.description} - R$ ${product.price.toFixed(2)}`;
            availableProductsList.appendChild(li);

            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `ID: ${product.id} - ${product.name} - ${product.description} - R$ ${product.price.toFixed(2)}`;
            productSelect.appendChild(option);
        });
    }

    function renderOrders() {
        ordersList.innerHTML = '';
        orderService.listOrders().then(orders => {
            orders.forEach(order => {
                const li = document.createElement('li');
                li.textContent = `Pedido #${order.id} - ${order.status}`;

                if (order.status === 'Aberto') {
                    const btnRemoveOrder = document.createElement('button');
                    btnRemoveOrder.textContent = 'Remover';
                    btnRemoveOrder.addEventListener('click', (event) => {
                        event.stopPropagation();
                        orderService.removeOrder(order.id);
                        renderOrders();

                        if(orderService.currentOrder && orderService.currentOrder.id === order.id){
                            showOrderDetails(null)
                        }
                    });
                    li.appendChild(btnRemoveOrder);
                }

                li.addEventListener('click', () => showOrderDetails(order));
                ordersList.appendChild(li);
            });
        });
    }

    btnRegisterProduct.addEventListener('click', () => {
        const productName = newProductNameInput.value.trim();
        const productDescription = newProductDescriptionInput.value.trim();
        const productPrice = parseFloat(document.getElementById('newProductPrice').value.trim());

        if (productName && productDescription && !isNaN(productPrice) && productName.length <= 50 && productDescription.length <= 50) {
            orderService.registerProduct(productName, productDescription, productPrice);
            newProductNameInput.value = '';
            newProductDescriptionInput.value = '';
            document.getElementById('newProductPrice').value = '';
            renderAvailableProducts();
        } else {
            alert('Por favor, preencha todos os campos (máximo 50 caracteres cada).');
        }
    });

    function showOrderDetails(order) {
        if(!order){
            orderDetailsSection.style.display = 'none';
            return
        }

        orderService.currentOrder = order;
        orderDetailsSection.style.display = 'block';
        orderStatus.textContent = `Status: ${order.status}`;
        totalDisplay.textContent = `Total: R$ ${order.total.toFixed(2)}`;
        productsList.innerHTML = '';

        const orderIdDisplay = document.getElementById('orderIdDisplay');
        orderIdDisplay.textContent = `ID #${order.id}`;

        if (order.status === 'Fechado') {
            orderStatus.style.color = 'red';
            btnAddProductToOrder.style.display = 'none';
            btnCloseOrder.style.display = 'none';
            productSelect.style.display = 'none';
        } else {
            orderStatus.style.color = 'green';
            btnAddProductToOrder.style.display = 'block';
            btnCloseOrder.style.display = order.products.length > 0 ? 'block' : 'none';
            productSelect.style.display = 'block';
        }

        order.products.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.description} - R$ ${product.price.toFixed(2)}`;

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

    async function generateReport() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const filterSelect = document.getElementById('reportFilter');
        const filterValue = filterSelect.value;

        let filteredOrders;
        switch (filterValue) {
            case 'aberto':
                filteredOrders = orderService.orders.filter(order => order.status === 'Aberto');
                doc.text('Filtro: Pedidos Abertos', 10, 20);
                break;
            case 'fechado':
                filteredOrders = orderService.orders.filter(order => order.status === 'Fechado');
                doc.text('Filtro: Pedidos Fechados', 10, 20);
                break;
            default:
                filteredOrders = orderService.orders;
                doc.text('Filtro: Todos os Pedidos', 10, 20);
        }

        if (filteredOrders.length === 0) {
            doc.text('Nenhum Pedido Encontrado', 10, 30);
        } else {
            let y = 30;
            filteredOrders.forEach(order => {
                doc.text(`Pedido #${order.id} - Status: ${order.status}`, 10, y);
                y += 10;

                order.products.forEach(product => {
                    doc.text(`- ${product.name} - ${product.description} - R$ ${product.price.toFixed(2)}`, 10, y);
                    y += 10;
                });

                doc.text(`Total: R$ ${order.total.toFixed(2)}`, 10, y);
                y += 15;
            });
        }

        doc.save("Relatorio_Pedidos.pdf");
    }

    btnGenerateReport.addEventListener('click', generateReport);

    renderOrders();
});