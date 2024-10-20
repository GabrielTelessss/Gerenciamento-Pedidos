
const OrderService = require('./orderService'); 
require('./script'); 

describe('Interações com o DOM e OrderService', () => {
    let orderService;

    beforeEach(() => {
        orderService = new OrderService();
        document.body.innerHTML = `
            <div>
                <button id="btnNewOrder">Novo Pedido</button>
                <button id="btnAddProductToOrder">Adicionar Produto ao Pedido</button>
                <ul id="ordersList"></ul>
                <ul id="productsList"></ul>
                <input id="newProductName" />
                <input id="newProductDescription" />
                <button id="btnRegisterProduct">Registrar Produto</button>
                <div id="orderDetailsSection" style="display:none;">
                    <span id="orderStatus"></span>
                    <ul id="availableProductsList"></ul>
                    <button id="btnCloseOrder">Fechar Pedido</button>
                </div>
                <select id="productSelect"></select>
                <button id="btnToggleProductRegistration">Toggle Registro Produto</button>
                <select id="reportFilter">
                    <option value="todos">Todos</option>
                    <option value="aberto">Abertos</option>
                    <option value="fechado">Fechados</option>
                </select>
                <button id="btnGenerateReport">Gerar Relatório</button>
            </div>
        `;
    });

    test('deve criar um novo pedido e exibir detalhes', () => {
        document.getElementById('btnNewOrder').click();
        expect(orderService.orders).toHaveLength(1);
        const orderDetails = document.getElementById('orderDetailsSection');
        expect(orderDetails.style.display).toBe('block');
    });

    test('deve registrar um novo produto e exibi-lo na lista', () => {
        document.getElementById('newProductName').value = 'Produto Teste';
        document.getElementById('newProductDescription').value = 'Descrição Teste';
        document.getElementById('btnRegisterProduct').click();
        
        expect(orderService.products).toHaveLength(1);
        const availableProductsList = document.getElementById('availableProductsList');
        expect(availableProductsList.children).toHaveLength(1);
    });

    test('deve adicionar um produto ao pedido atual', () => {
        document.getElementById('btnNewOrder').click();
        orderService.registerProduct('Produto 1', 'Descrição do Produto 1');

        const productSelect = document.getElementById('productSelect');
        productSelect.value = '1';
        document.getElementById('btnAddProductToOrder').click();

        const order = orderService.currentOrder;
        expect(order.products).toHaveLength(1);
    });

    test('deve fechar o pedido atual', () => {
        document.getElementById('btnNewOrder').click();
        orderService.registerProduct('Produto 1', 'Descrição do Produto 1');
        document.getElementById('btnAddProductToOrder').click();

        document.getElementById('btnCloseOrder').click();
        const order = orderService.currentOrder;
        expect(order.status).toBe('Fechado');
    });

    test('deve gerar um relatório de pedidos', async () => {
        const saveSpy = jest.spyOn(window.jspdf, 'jsPDF').mockImplementation(() => ({
            save: jest.fn(),
            text: jest.fn(),
        }));

        document.getElementById('btnNewOrder').click();
        orderService.registerProduct('Produto 1', 'Descrição do Produto 1');
        document.getElementById('btnAddProductToOrder').click();

        document.getElementById('btnGenerateReport').click();
        
        expect(saveSpy).toHaveBeenCalled();
        saveSpy.mockRestore();
    });
});